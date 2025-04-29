import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"


class PostsService {

  async getPosts() {
    const response = await api.get('api/posts')
    logger.log('GOT POSTS', response.data)
    const posts = response.data.posts.map(pojo => new Post(pojo))
    AppState.post = posts
  }

  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    logger.log('CREATED POST!', response.data)
    const post = new Post(response.data)
    AppState.post.unshift(post)
  }

  async getNextPage(pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}`)
    logger.log('Changed page', response.data)
    const post = response.data.posts.map(pojo => new Post(pojo))
    AppState.post = post
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }

  async likePost(postId) {
    const response = await api.post(`api/posts/${postId}/like`)
    logger.log('liked post', response.data)
  }

  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log('deleted post', response.data)
  }

}

export const postsService = new PostsService()