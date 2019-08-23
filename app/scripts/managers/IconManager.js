import { SITE_EVENT } from '../entities';

export class IconManager {
  /**
   * @param {object} options
   * @param {import('../entities').Site} options.site
   * @param {number} options.tabId
   */
  constructor({ site, tabId }) {
    this.site = site;
    this.tabId = tabId;
  }

  turnOn() {
    browser.browserAction.setIcon({
      tabId: this.tabId,
      path: {
        '16': 'images/red_16.png',
        '32': 'images/red_32.png',
        '64': 'images/red_64.png',
        '128': 'images/red_128.png',
      },
    });
  }

  turnOff() {
    browser.browserAction.setIcon({
      tabId: this.tabId,
      path: {
        '16': 'images/grey_16.png',
        '32': 'images/grey_32.png',
        '64': 'images/grey_64.png',
        '128': 'images/grey_128.png',
      },
    });
  }

  /**
   * @param {string} event
   */
  on(event) {
    if (event === SITE_EVENT.COOKIE_ADDED && this.site.hasThirdPartyCookies()) {
      this.turnOn();
    }

    if (event === SITE_EVENT.FORGOTTEN) {
      this.turnOff();
    }
  }
}
