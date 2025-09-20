import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const stationId = station.id;
    const maxTemperature = stationAnalytics.getMaxTemperature(station); //calling in the Min, Max and Current Data from stationAnalytics
    const minTemperature = stationAnalytics.getMinTemperature(station);
    const maxPressure = stationAnalytics.getMaxPressure(station);
    const minPressure = stationAnalytics.getMinPressure(station);
    const maxWindspeed = stationAnalytics.getMaxWindspeed(station);
    const minWindspeed = stationAnalytics.getMinWindspeed(station);
    const currentWeathercode = stationAnalytics.getCurrentWeathercode(station);
    const currentTemperature = stationAnalytics.getCurrentTemperature(station);
    const currentWindspeed = stationAnalytics.getCurrentWindspeed(station);
    const currentWinddirection = stationAnalytics.getCurrentWinddirection(station);
    const currentPressure = stationAnalytics.getCurrentPressure(station);
    const currentWeatherIcon = stationAnalytics.getCurrentWeatherIcon(station);
    const currentWeatherDescription = stationAnalytics.getCurrentWeatherDescription(station);
    const viewData = {
      station: station,
      city: station.city,
      stationId: stationId,
      latitude: station.latitude,
      longitude: station.longitude,
      maxTemperature: maxTemperature,
      minTemperature: minTemperature,
      maxPressure: maxPressure,
      minPressure: minPressure,
      maxWindspeed: maxWindspeed,
      minWindspeed: minWindspeed,
      currentWeathercode: currentWeathercode,
      currentTemperature: currentTemperature,
      currentWindspeed: currentWindspeed,
      currentWinddirection: currentWinddirection,
      currentPressure: currentPressure,
      currentWeatherIcon: currentWeatherIcon,
      currentWeatherDescription: currentWeatherDescription,
    };
    console.log("station rendering");
    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const reportdate = new Date().toString();
    const newReport = {
      reportdate: reportdate,
      weathercode: Number(request.body.weathercode),
      temperature: Number(request.body.temperature),
      windspeed: Number(request.body.windspeed),
      pressure: Number(request.body.pressure),
      winddirection: (request.body.winddirection),
    };
    console.log(`adding report`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(request.params.reportid);
    response.redirect("/station/" + stationId);
  },
};
