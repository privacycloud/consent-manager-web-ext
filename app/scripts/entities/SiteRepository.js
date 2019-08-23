export class SiteRepository {
  constructor() {
    /**
     * @type {Repository}
     * @private
     */
    this.store = {};
  }

  /**
   * @param {object} options
   * @param {number} options.tabId
   * @param {import('./Site').Site} options.site
   */
  add({ site, tabId }) {
    this.store[tabId] = site;
  }

  /**
   * @param {number} tabId
   */
  findByTabId(tabId) {
    return this.store[tabId];
  }

  /**
   * @param {number} tabId
   */
  forgetByTabId(tabId) {
    const site = this.store[tabId];

    if (site) {
      site.forget();
    }

    this.store[tabId] = null;
  }
}
