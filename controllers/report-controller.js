import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { stationController } from "./station-controller.js";

export const reportController = {
  async index(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Editing Report ${reportId} from Station ${stationId}`);
    const viewData = {
      reportdate: (request.body.reportdate), //requesting the current time stamp when the report was created
      weathercode: Number(request.body.weathercode),
      temperature: Number(request.body.temperature),
      windspeed: Number(request.body.windspeed),
      pressure: Number(request.body.pressure),
      winddirection: (request.body.winddirection),
    };
    console.log("report rendering");
    response.render("report-view", viewData);
  },
};
