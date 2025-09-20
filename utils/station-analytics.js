import {reportStore} from "../models/report-store.js";
import {reportController} from "../controllers/report-controller.js";
import {stationController} from "../controllers/station-controller.js";

export const stationAnalytics = {
    getMinTemperature(station) {
        let minTemperature = null;
        if (station.reports.length > 0) {
            minTemperature = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].temperature < minTemperature.temperature) {
                    minTemperature = station.reports[i];
                }
            }
        }
        return minTemperature;
    },

    getMaxTemperature(station) {
        let maxTemperature = null;
        if (station.reports.length > 0) {
            maxTemperature = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].temperature > maxTemperature.temperature) {
                    maxTemperature = station.reports[i];
                }
            }
        }
        return maxTemperature;
    },

    getMinPressure(station) {
        let minPressure = null;
        if (station.reports.length > 0) {
            minPressure = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].pressure < minPressure.pressure) {
                    minPressure = station.reports[i];
                }
            }
        }
        return minPressure;
    },

    getMaxPressure(station) {
        let maxPressure = null;
        if (station.reports.length > 0) {
            maxPressure = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].pressure > maxPressure.pressure) {
                    maxPressure = station.reports[i];
                }
            }
        }
        return maxPressure;
    },

    getMinWindspeed(station) {
        let minWindspeed = null;
        if (station.reports.length > 0) {
            minWindspeed = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].windspeed < minWindspeed.windspeed) {
                    minWindspeed = station.reports[i];
                }
            }
        }
        return minWindspeed;
    },

    getMaxWindspeed(station) {
        let maxWindspeed = null;
        if (station.reports.length > 0) {
            maxWindspeed = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].windspeed > maxWindspeed.windspeed) {
                    maxWindspeed = station.reports[i];
                }
            }
        }
        return maxWindspeed;
    },
    getCurrentWeathercode(station) {
        let currentWeathercode = null;
        const latestReport = station.reports.sort((a, b) => new Date(b.reportdate) - new Date(a.reportdate)) [0];
        if (station.reports.length > 0) {
            currentWeathercode = latestReport.weathercode;
            return currentWeathercode;
        }
    },

    getCurrentTemperature(station) {
        let currentTemperature = null;
        const latestReport = station.reports.sort((a, b) => new Date(b.reportdate) - new Date(a.reportdate)) [0]; //sorting the reports to start with newest report. https://masteringjs.io/tutorials/fundamentals/sort-by-date, https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
        if (station.reports.length > 0) {
            currentTemperature = latestReport.temperature;
            return currentTemperature;
        }
    },

    getCurrentWindspeed(station) {
        let currentWindspeed = null;
        const latestReport = station.reports.sort((a, b) => new Date(b.reportdate) - new Date(a.reportdate)) [0]; //sorting the reports to start with newest report. https://masteringjs.io/tutorials/fundamentals/sort-by-date, https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
        if (station.reports.length > 0) {
            currentWindspeed = latestReport.windspeed;
            return currentWindspeed;
        }
    },

    getCurrentWinddirection(station) {
        let currentWinddirection = null;
        const latestReport = station.reports.sort((a, b) => new Date(b.reportdate) - new Date(a.reportdate)) [0]; //sorting the reports to start with newest report. https://masteringjs.io/tutorials/fundamentals/sort-by-date, https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
        if (station.reports.length > 0) {
            currentWinddirection = latestReport.winddirection;
            return currentWinddirection;
        }
    },

    getCurrentPressure(station) {
        let currentPressure = null;
        const latestReport = station.reports.sort((a, b) => new Date(b.reportdate) - new Date(a.reportdate)) [0]; //sorting the reports to start with newest report. https://masteringjs.io/tutorials/fundamentals/sort-by-date, https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
        if (station.reports.length > 0) {
            currentPressure = latestReport.pressure;
            return currentPressure;
        }
    },

    getCurrentWeatherIcon(station) {
        let currentWeatherIcon = null;
        if (station.reports.length > 0) {
            const latestReport = station.reports.sort((a, b) => new Date(b.reportdate) - new Date(a.reportdate)) [0];
            const currentWeathercode = latestReport.weathercode;

            if (currentWeathercode >= 200 && currentWeathercode <= 232) {
                currentWeatherIcon = "http://openweathermap.org/img/wn/11d@2x.png";
            } else if (currentWeathercode >= 300 && currentWeathercode <= 321) {
                currentWeatherIcon = "http://openweathermap.org/img/wn/09d@2x.png";
            } else if (currentWeathercode >= 500 && currentWeathercode <= 531) {
                currentWeatherIcon = "http://openweathermap.org/img/wn/10d@2x.png";
            } else if (currentWeathercode >= 600 && currentWeathercode <= 622) {
                currentWeatherIcon = "http://openweathermap.org/img/wn/13d@2x.png";
            } else if (currentWeathercode >= 700 && currentWeathercode <= 781) {
                currentWeatherIcon = "http://openweathermap.org/img/wn/50d@2x.png";
            } else if (currentWeathercode >= 801 && currentWeathercode <= 804) {
                currentWeatherIcon = "http://openweathermap.org/img/wn/02d@2x.png";
            } else if (currentWeathercode === 800) {
                currentWeatherIcon = "http://openweathermap.org/img/wn/01d@2x.png";
            }
            return currentWeatherIcon;
        }
    },

    getCurrentWeatherDescription(station) {
        let currentWeatherDescription = null;
        if (station.reports.length > 0) {
            const latestReport = station.reports.sort((a, b) => new Date(b.reportdate) - new Date(a.reportdate)) [0];
            const currentWeathercode = latestReport.weathercode;

            if (currentWeathercode >= 200 && currentWeathercode <= 232) {
                currentWeatherDescription = "Thunderstorm";
            } else if (currentWeathercode >= 300 && currentWeathercode <= 321) {
                currentWeatherDescription = "Drizzle";
            } else if (currentWeathercode >= 500 && currentWeathercode <= 531) {
                currentWeatherDescription = "Rain";
            } else if (currentWeathercode >= 600 && currentWeathercode <= 622) {
                currentWeatherDescription = "Snow";
            } else if (currentWeathercode >= 700 && currentWeathercode <= 781) {
                currentWeatherDescription = "Atmosphere";
            } else if (currentWeathercode >= 801 && currentWeathercode <= 804) {
                currentWeatherDescription = "Clouds";
            } else if (currentWeathercode === 800) {
                currentWeatherDescription = "Clear Sky";
            }
            return currentWeatherDescription;
        }
    },
};


