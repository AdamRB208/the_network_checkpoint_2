import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ad } from "@/models/Ads.js"
import { AppState } from "@/AppState.js"

class AdsService {
  async getAds() {
    const response = await api.get('api/ads')
    logger.log('Got Ads!', response.data)
    const ads = response.data.map(pojo => new Ad(pojo))
    AppState.ad = ads
  }
}

export const adsService = new AdsService()