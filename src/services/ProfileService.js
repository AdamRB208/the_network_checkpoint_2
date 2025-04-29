import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Profile } from "@/models/Profile.js"

class ProfileService {
  async getProfileById(profileId) {
    AppState.profile = null
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('GOT PROFILE!', response.data)
    const profile = new Profile(response.data)
    AppState.profile = profile
  }

  async getPostsByProfileId(profileId) {
    AppState.profile = null
    const response = await api.get(`api/profiles/${profileId}/posts`)
    logger.log('GOT POSTS BY PROFILE ID', response.data)
  }

}

export const profileService = new ProfileService()