import { IconManager } from '../managers';
import { Site } from '../entities';
import tap from 'lodash/tap';

export class TabEventHandler {
  /**
   * @param {object} options
   * @param {import('../entities').SiteRepository} options.repository
   */
  constructor({ repository }) {
    this.repository = repository;
  }

  /**
   * Creates a new site for the specified tabId
   *
   * @param {number} tabId
   * @param {string} url
   */
  onCreateTab(tabId, url) {
    const site = new Site({ url });
    const iconManager = tap(new IconManager({ site, tabId }), (icon) => icon.turnOff());

    site.addObserver(iconManager);

    this.repository.add({ tabId, site });
  }

  /**
   * Forgets a site for the specified tabId
   *
   * @param {number} tabId
   */
  onRemoveTab(tabId) {
    this.repository.forgetByTabId(tabId);
  }
}
