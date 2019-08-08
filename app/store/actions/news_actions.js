import { GET_NEWS } from "../types";
import axios from "axios";

import { FIREBASEURL } from "../../utils/misc";

export function getNews() {
  const request = axios({
    method: "GET",
    url: `${FIREBASEURL}/news.json`
  })
    .then(response => {
      console.log(response.data);
      const articles = [];
      for (let key in response.data) {
        articles.push({
          ...response.data[key],
          id: key
        });
      }
      return articles;
    })
    .catch(err => {
      return false;
    });

  return {
    type: GET_NEWS,
    payload: request
  };
}
