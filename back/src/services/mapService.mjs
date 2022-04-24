import fs from "fs";
import GeoJSON from "geojson";
import { restaurantService } from "./restaurantService.mjs";
import { Country } from "../db/index.mjs";

class mapService {
  //geojson 세계지도 국가별 마커
  static async getWorldGeoMarker() {
    let ret = await this.getCountryObj();

    for (let i = 0; i < ret.length; i++) {
      //응답 받을떄 까지 1176 ms정도 걸리네요
      //밑에 연산을 매번 할 필요는 없을것 같아서 그냥 db에다 count를 추가하는게 나을거 같기도 하네요

      // const c = await restaurantService.getRestaurantsByCountry({
      //   restaurantCountry: ret[i].nation,
      // });
      // ret[i]["count"] = c.length;

      //400ms 걸리는 버전
      let c = await restaurantService.countRestaurantByQuery({
        country: ret[i].nation,
      });
      ret[i]["count"] = c;
    }

    return GeoJSON.parse(ret, { Point: ["lat", "lng"] });
  }

  //그냥 json으로
  static async getWorldMarker() {
    let ret = await this.getCountryObj();

    //응답 받을떄 까지 1430 ms 정도 걸리네요
    //밑에 연산을 매번 할 필요는 없을것 같아서 그냥 db에다 count를 추가하는게 나을거 같기도 하네요

    for (let i = 0; i < ret.length; i++) {
      // const c = await restaurantService.getRestaurantsByCountry({
      //   restaurantCountry: ret[i].nation,
      // });
      // ret[i]["count"] = c.length;

      //대충 400ms
      let c = await restaurantService.countRestaurantByQuery({
        country: ret[i].nation,
      });
      ret[i]["count"] = c;
    }
    return ret;
  }

  //전체 국가 객체 반환
  static async getCountryObj() {
    return Country.findByQuery({});
  }

  // 국가 마커 geojson으로 반환
  static async getCountryMarker(country) {
    let ret = await restaurantService.getRestaurantsByCountry({
      restaurantCountry: country,
    });
    return GeoJSON.parse(ret, { Point: ["latitude", "longitude"] });
  }
}

export { mapService };
