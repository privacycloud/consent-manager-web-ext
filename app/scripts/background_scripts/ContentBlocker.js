export class ContentBlocker {
  constructor({ urlsToBlock }) {
    this.urlsToBlock = urlsToBlock;
  }

  start() {
    browser.webRequest.onBeforeRequest.addListener(() => ({ cancel: true }), { urls: this.urlsToBlock }, ['blocking']);
  }
}
