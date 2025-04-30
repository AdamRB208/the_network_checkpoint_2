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
   *  @property {string} linkedin
   * @property {string} github
   * @property {string} resume
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
    this.linkedin = data.linkedin
    this.github = data.github
    this.resume = data.resume
    // TODO add additional properties if needed
  }
}
