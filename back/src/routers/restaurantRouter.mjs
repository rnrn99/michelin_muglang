import { Router } from "express";
import { RestaurantService } from "../services/RestaurantService.mjs";

const restaurantRouter = Router();

// Path: /restaurants
restaurantRouter.get("/restaurants", async function (req, res, next) {
  // (/restaurants?page=${페이지 시작 위치}&pageSize=${페이지 크기})
  if (req.query.page && req.query.pageSize) {
    try {
      const { page, pageSize } = req.query;

      if (page <= 0 || pageSize <= 0) {
        const error = new Error("잘못된 페이지를 입력하셨습니다.");
        error.statusCode = 400;
        throw error;
      }

      // 특정 국가에 있는 식당들의 정보를 얻음 (/restaurants?country=${검색할 국가 이름})
      if (req.query.country) {
        try {
          // URI로부터 country(query)를 추출함
          const country = req.query.country;
          const { restaurants, lastPage, len, offset } =
            await RestaurantService.getRestaurantsByCountryPaging({
              page,
              pageSize,
              country,
            });

          const response = {
            code: 200,
            total: len,
            data: restaurants,
            last: lastPage,
            offset,
          };

          res.status(200).send(response);
          return;
        } catch (error) {
          next(error);
        }
      } else if (req.query.cuisine) {
        // 특정 국가에 있는 식당들의 정보를 얻음 (/restaurants?cuisine=${음식 분류})
        try {
          // URI로부터 cuisine(query)를 추출함
          const cuisine = req.query.cuisine;
          const { restaurants, lastPage, len, offset } =
            await RestaurantService.getRestaurantsByCuisinePaging({
              page,
              pageSize,
              cuisine,
            });

          const response = {
            code: 200,
            total: len,
            data: restaurants,
            last: lastPage,
            offset,
          };

          res.status(200).send(response);
          return;
        } catch (error) {
          next(error);
        }
      }

      // 전체 식당 중 일부를 paging하여 얻음
      const { restaurants, lastPage, len, offset } =
        await RestaurantService.getRestaurantsPaging({
          page,
          pageSize,
        });

      const response = {
        code: 200,
        total: len,
        data: restaurants,
        last: lastPage,
        offset,
      };

      res.status(200).send(response);
      return;
    } catch (error) {
      next(error);
    }
  } else {
    const error = new Error(
      "조회할 페이지(page)와 페이지의 크기(pageSize)를 지정해주세요.",
    );
    error.statusCode = 400;
    next(error);
  }
});

// Path: /restaurants/search
restaurantRouter.get("/restaurants/search", async function (req, res, next) {
  // pagenation (/restaurants/search?page=${페이지 시작 위치}&pageSize=${페이지 크기})
  if (req.query.page && req.query.pageSize) {
    const { page, pageSize } = req.query;

    if (page <= 0 || pageSize <= 0) {
      const error = new Error("잘못된 페이지를 입력하셨습니다.");
      error.statusCode = 400;
      throw error;
    }

    // 검색할 내용이 없음 -> 전체 레스토랑 반환(검색하는 필드 입력하지 않았을 때)
    if (Object.keys(req.query).length == 2) {
      try {
        const { restaurants, lastPage, len, offset } =
          await RestaurantService.getRestaurantsPaging({
            page,
            pageSize,
          });

        const response = {
          code: 200,
          total: len,
          data: restaurants,
          last: lastPage,
          offset,
        };

        res.status(200).send(response);
        return;
      } catch (error) {
        next(error);
      }
    }

    try {
      const {
        name,
        address,
        location,
        minPrice,
        maxPrice,
        cuisine,
        award,
        country,
      } = req.query;

      const { restaurants, lastPage, len, offset } =
        await RestaurantService.getRestaruantsByQuery({
          page,
          pageSize,
          name,
          address,
          location,
          minPrice,
          maxPrice,
          cuisine,
          award,
          country,
        });

      const response = {
        code: 200,
        total: len,
        data: restaurants,
        last: lastPage,
        offset,
      };

      res.status(200).send(response);
      return;
    } catch (error) {
      next(error);
    }
  } else {
    const error = new Error(
      "조회할 페이지(page)와 페이지의 크기(pageSize)를 지정해주세요.",
    );
    error.statusCode = 400;
    next(error);
  }
});

// Path: /restaurants/:id
restaurantRouter.get("/restaurants/:id", async function (req, res, next) {
  // 특정 식당의 가격에 대한 환전 결과를 얻음 (/restaurants/:id?currency=${환전할 통화 코드})
  if (req.query.currency) {
    try {
      // URI로부터 id(params)와 currency(query)를 추출함
      const id = req.params.id;
      const currencyCode = req.query.currency;

      // currency exchange된 minPrice와 maxPrice와 targetCurrency에 대한 정보를 얻음
      const prices = await RestaurantService.getConvertedPrice({
        id,
        currencyCode,
      });

      const response = {
        code: 200,
        data: prices,
      };

      res.status(200).send(response);
      return;
    } catch (error) {
      next(error);
    }
  }

  // 특정 식당의 정보를 얻음
  try {
    // URI로부터 restaurant_id를 추출함
    const id = req.params.id;
    const restaurant = await RestaurantService.getRestaurantInfo({ id });

    const response = {
      code: 200,
      data: restaurant,
    };

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// Path: /restaurants/:id/near
restaurantRouter.get("/restaurants/:id/near", async function (req, res, next) {
  // 특정 식당과 가까운 식당 목록을 얻음
  try {
    // URI로부터 id를 추출함
    const id = req.params.id;
    const restaurantsNear = await RestaurantService.getRestaurantsNear({ id });

    const response = {
      code: 200,
      data: restaurantsNear,
    };

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

export { restaurantRouter };
