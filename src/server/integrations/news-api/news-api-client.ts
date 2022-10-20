import axios from "axios";
import { ConfigType } from "dayjs";

const config = {
  baseURL: "https://newsapi.org/v2",
  params: {
    apiKey: process.env.NEWS_API_KEY as string,
    language: "en",
  },
};

const httpClient = axios.create(config);

const newsApiClient = {
  async getLatestArticles({ from }: { from: ConfigType }) {
    const { data } = await httpClient.get("/everything", {
      params: { from, q: "drone" },
    });
    return data?.articles;
  },
};

export default newsApiClient;
