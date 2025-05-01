import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Profile } from "@/models/Profile.js"
import { Post } from "@/models/Post.js"

class ProfileService {

  async searchProfiles(searchQuery) {
    const response = await api.get(`api/profiles?query=${searchQuery}`)
    logger.log('Searching profiles!', response.data)
    const profiles = response.data.map(pojo => new Profile(pojo))
    logger.log('mapping profiles', profiles)
    AppState.profile = profiles
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }

  async getNextProfilePage(profileId, pageNumber) {
    const response = await api.get(`api/profiles/${profileId}/posts?page=${pageNumber}`)
    logger.log('Changed Page!', response.data)
    const post = response.data.posts.map(pojo => new Post(pojo))
    AppState.profilePosts = post
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
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
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
    logger.log('rendering profile posts', AppState.profilePosts)
  }

}

export const profileService = new ProfileService()