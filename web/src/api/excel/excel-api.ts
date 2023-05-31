import axios from "axios";
import {DOWNLOAD_ARTICLE_STATISTIC_URL} from "@api/excel/constants";
import {DownloadArticleDataRequest} from "@api/excel/types";

export const excelApi = {
  async downloadArticleStatistic(data: DownloadArticleDataRequest){
    return await axios.post(DOWNLOAD_ARTICLE_STATISTIC_URL, data).then(res => res.data)
  },
}