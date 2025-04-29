import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Profile } from "@/models/Profile.js"
import { Post } from "@/models/Post.js"

class ProfileService {
  async getNextProfilePage(pageNumber) {
    const response = await api.get(`api/profiles?query=${pageNumber}`)
    logger.log('Changed Page!', response.data)
  }
  async getProfileById(profileId) {
    AppState.profile = null
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('GOT PROFILE!', response.data)
    const profile = new Profile(response.data)
    AppState.profile = profile
  }

  async getPostsByProfileId(profileId) {
    AppState.profilePosts = []
    const response = await api.get(`api/profiles/${profileId}/posts`)
    logger.log('GOT POSTS BY PROFILE ID', response.data)
    AppState.profilePosts = response.data.posts.map(postData => new Post(postData))
    logger.log('rendering profile posts', AppState.profilePosts)
  }

}

export const profileService = new ProfileService()