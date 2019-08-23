export class ContentBlocker {
  /**
   * @param {object} options
   * @param {string[]} options.urlsToBlock
   */
  constructor({ urlsToBlock }) {
    this.urlsToBlock = urlsToBlock;
  }

  start() {
    browser.webRequest.onBeforeRequest.addListener(() => ({ cancel: true }), { urls: this.urlsToBlock }, ['blocking']);
  }
}
