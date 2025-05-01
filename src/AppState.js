import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,

  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {import('./models/Post.js').Post[]} user info from the database*/
  post: [],

  /** @type {import('./models/Post.js').Post[]} user info from the database*/
  profilePosts: [],

  /** @type {import('./models/Post.js').Post[]} user info from the database*/
  searchedPosts: [],

  /** @type {import('./models/Profile.js').Profile} user info from the database*/
  profile: null,

  /** @type {import('./models/Ads.js').Ad[]} user info from the database*/
  ad: [],

  currentPage: 1,

  totalPages: 11,

  postsSearchQuery: '',

  profileSearchQuery: '',

})

