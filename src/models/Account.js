export class Account {
  /**
   * @typedef AccountData
   * @property {string} id
   * @property {string} email
   * @property {string} name
   * @property {string} picture
   * @property {string} coverImg
   * @property {string} bio
   * @property {string} class
   * @property {string} graduated
   * 
   * @param {AccountData} data
   */
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.coverImg = data.coverImg
    this.bio = data.bio
    this.class = data.class
    this.graduated = data.graduated
    // TODO add additional properties if needed
  }
}
