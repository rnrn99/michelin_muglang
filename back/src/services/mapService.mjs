import fs from "fs";
import GeoJSON from "geojson";

class mapService {
  //래스토랑 mvp 끝나면 db에서 가져오는걸로 바꿀 예정 지금은 일단 그냥 목데이터
  static async getData() {
    const jsonFile = await fs.promises.readFile("mockData.json");
    const data = JSON.parse(jsonFile);
    return data;
  }

  //세계지도 폴리곤
  //기존 geojson에 쓸모 없는 프로퍼티가 너무 많아 name만 남기고 날리려고 코드 길게 썼는데 그냥 원본 geojson을 수정할 예정
  static async getWorldMap() {
    const jsonFile = await fs.promises.readFile("custom.geo.json");
    const data = JSON.parse(jsonFile);
    const countryObj = await this.getCountryObj();
    data.features.forEach((e) => {
      const name = e.properties.name;
      const count = countryObj[name] || 0;
      delete e.properties;
      e.properties = { name, count };
    });

    return data;
  }

  //전체 국가 객체 반환
  //이것도 db에 country 컬럼 추가되면 안쓸것 같음 일단 직접 슬라이싱 해서 country 개수 카운팅
  static async getCountryObj() {
    let data = await this.getData();
    const ret = {};
    for (let i = 0; i < data.length; i++) {
      const arr = data[i].address.split(", ");
      const city = arr[arr.length - 1];
      if (ret[city]) {
        ret[city] += 1;
      } else {
        ret[city] = 1;
      }
    }
    return ret;
  }

  //전체 마커 geojson으로 반환
  //테스트용 그냥 전체 레스토랑 마커로 변환
  static async getWorldMarker() {
    let data = await this.getData();
    let d = GeoJSON.parse(data, {
      Point: ["latitude", "longitude"],
      // include: ["name", "cuisine"],
    });
    console.log(d);
    return d;
  }

  // 국가 마커 geojson으로 반환
  static async getCountryMarker(country) {
    let data = await this.getData();
    const ret = [];
    for (let i = 0; i < data.length; i++) {
      const arr = data[i].address.split(", ");
      const city = arr[arr.length - 1];
      if (country === city) {
        ret.push(data[i]);
      }
    }
    return GeoJSON.parse(ret, { Point: ["latitude", "longitude"] });
  }
}

export { mapService };
