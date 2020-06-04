export class SiteRepository {
  constructor() {
    this.store = {};
  }

  add({ site, tabId }) {
    this.store[tabId] = site;
  }

  findByTabId(tabId) {
    return this.store[tabId];
  }

  forgetByTabId(tabId) {
    const site = this.store[tabId];

    if (site) {
      site.forget();
    }

    this.store[tabId] = null;
  }
}
