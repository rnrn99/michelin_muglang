import { mapService } from "../services/mapService.mjs";
import { Router } from "express";

const mapRouter = Router();

//geojson 마커로 프로퍼티에 국가 이름, 해당 국가의 미슐랭 음식점 수 있음
mapRouter.get("/map/world/geojson", async (req, res, next) => {
  try {
    const ret = await mapService.getWorldGeoMarker();
    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
});

//혹시 몰라서 geojson 말고 그냥 json
mapRouter.get("/map/world", async (req, res, next) => {
  try {
    const ret = await mapService.getWorldMarker();
    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
});

//해당 국가의 모든 미슐랭 음식점 geojson 마커로 반환
mapRouter.get("/map/:country", async (req, res, next) => {
  try {
    const ret = await mapService.getCountryMarker(req.params.country);
    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
});

export { mapRouter };
