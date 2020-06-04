import { IconManager } from '../managers';
import { Site } from '../entities';
import tap from 'lodash/tap';

export class TabEventHandler {
  constructor({ repository }) {
    this.repository = repository;
  }

  onCreateTab(tabId, url) {
    const site = new Site({ url });
    const iconManager = tap(new IconManager({ site, tabId }), (icon) => icon.turnOff());

    site.addObserver(iconManager);

    this.repository.add({ tabId, site });
  }

  onRemoveTab(tabId) {
    this.repository.forgetByTabId(tabId);
  }
}
