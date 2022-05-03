import { Router } from "express";
import axios from "axios";

const googleRouter = Router();

//placeId 반환용
googleRouter.get("/google/:id", async function (req, res, next) {
  try {
    // URI로부터 restaurant_id를 추출함
    const id = req.params.id;
    const googleApiKey = process.env.GOOGLE_API_KEY;

    const query = {
      key: googleApiKey,
      place_id: id,
      language: "ko",
    };
    const ret = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: query,
      },
    );

    res.status(200).send(ret.data);
  } catch (error) {
    next(error);
  }
});

export { googleRouter };
