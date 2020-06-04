import { TabEventHandler } from './TabEventHandler';

export class TabEventListener {
  constructor({ repository }) {
    this.repository = repository;
    this.tabHandler = new TabEventHandler({ repository });
  }

  start() {
    browser.tabs.onRemoved.addListener((tabId) => this.tabHandler.onRemoveTab(tabId));

    browser.tabs.onUpdated.addListener((tabId, { url }) => {
      if (url) {
        this.tabHandler.onCreateTab(tabId, url);
      }
    });
  }
}
