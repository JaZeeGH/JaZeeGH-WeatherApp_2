import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { reportStore } from "../models/report-store.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);

    const stationsData = []; //creating a new stationsData array

    for (const station of stations) { 
      const reports = await reportStore.getReportsByStationId(station._id); //looking up the reports for each station within the stations

      //I was unable to call in the functions from Station-Analytics as it was missing still missing the reports.
      //Looking for all the data Min, Max and Current Data within the Dashboard Controller and making the calculations.
      let maxTemperature = null;
      let minTemperature = null;
      let maxPressure = null;
      let minPressure = null;
      let maxWindspeed = null;
      let minWindspeed = null;
      let currentWeathercode = null;
      let currentTemperature = null;
      let currentWindspeed = null;
      let currentWinddirection = null;
      let currentPressure = null;
      let currentWeatherIcon = null;
      let currentWeatherDescription = null;

      if (reports.length > 0) {
        maxTemperature = reports[0];
        minTemperature = reports[0];
        maxPressure = reports[0];
        minPressure = reports[0];
        maxWindspeed = reports[0];
        minWindspeed = reports[0];

        for (let i = 1; i < reports.length; i++) { //Using a for loop to look for the Min, Max Data from the reports
          if (reports[i].temperature > maxTemperature.temperature) {
            maxTemperature = reports[i];
          }
          if (reports[i].temperature < minTemperature.temperature) {
            minTemperature = reports[i];
          }
          if (reports[i].pressure > maxPressure.pressure) {
            maxPressure = reports[i];
          }
          if (reports[i].pressure < minPressure.pressure) {
            minPressure = reports[i];
          }
          if (reports[i].windspeed > maxWindspeed.windspeed) {
            maxWindspeed = reports[i];
          }
          if (reports[i].windspeed < minWindspeed.windspeed) {
            minWindspeed = reports[i];
          }
        };

        // Get the current weather data using the latest report with resorting the reports to have the newest at first[0]
        const latestReport = reports.sort((a, b) => new Date(b.reportdate) - new Date(a.reportdate))[0];
        currentWeathercode = latestReport.weathercode;
        currentTemperature = latestReport.temperature;
        currentWindspeed = latestReport.windspeed;
        currentWinddirection = latestReport.winddirection;
        currentPressure = latestReport.pressure;

        // Set description and weathericon based on weather code
        if (currentWeathercode >= 200 && currentWeathercode <= 232) {
          currentWeatherDescription = "Thunderstorm";
          currentWeatherIcon = "http://openweathermap.org/img/wn/11d@2x.png";
        } else if (currentWeathercode >= 300 && currentWeathercode <= 321) {
          currentWeatherDescription = "Drizzle";
          currentWeatherIcon = "http://openweathermap.org/img/wn/09d@2x.png";
        } else if (currentWeathercode >= 500 && currentWeathercode <= 531) {
          currentWeatherDescription = "Rain";
          currentWeatherIcon = "http://openweathermap.org/img/wn/10d@2x.png";
        } else if (currentWeathercode >= 600 && currentWeathercode <= 622) {
          currentWeatherDescription = "Snow";
          currentWeatherIcon = "http://openweathermap.org/img/wn/13d@2x.png";
        } else if (currentWeathercode >= 700 && currentWeathercode <= 781) {
          currentWeatherDescription = "Atmosphere";
          currentWeatherIcon = "http://openweathermap.org/img/wn/50d@2x.png";
        } else if (currentWeathercode >= 801 && currentWeathercode <= 804) {
          currentWeatherDescription = "Clouds";
          currentWeatherIcon = "http://openweathermap.org/img/wn/02d@2x.png";
        } else if (currentWeathercode === 800) {
          currentWeatherDescription = "Clear Sky";
          currentWeatherIcon = "http://openweathermap.org/img/wn/01d@2x.png";
        }
      }

      stationsData.push({
        ...station, //spreading station to keep the original station properties without this there was no stationid recognised by request.params.id in station-controller
        maxTemperature, //addtionally we are pushing all the data to the new array as well
        minTemperature,
        maxPressure,
        minPressure,
        maxWindspeed,
        minWindspeed,
        currentWeathercode,
        currentTemperature,
        currentWindspeed,
        currentWinddirection,
        currentPressure,
        currentWeatherIcon,
        currentWeatherDescription,
      });
      
    };

    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationsData,
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      city: request.body.city,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      userid: loggedInUser._id,
    };
    console.log('adding station ${newStation.city}');
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
