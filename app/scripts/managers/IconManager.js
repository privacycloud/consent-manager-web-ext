import { SITE_EVENT } from '../entities';

export class IconManager {
  constructor({ env = process.env.NODE_ENV, site, tabId }) {
    this.env = env;
    this.site = site;
    this.tabId = tabId;
  }

  turnOn() {
    browser.browserAction.setIcon({
      tabId: this.tabId,
      path: {
        '16': `images/${this.env}/red_16.png`,
        '32': `images/${this.env}/red_32.png`,
        '64': `images/${this.env}/red_64.png`,
        '128': `images/${this.env}/red_128.png`,
      },
    });
  }

  turnOff() {
    browser.browserAction.setIcon({
      tabId: this.tabId,
      path: {
        '16': `images/${this.env}/grey_16.png`,
        '32': `images/${this.env}/grey_32.png`,
        '64': `images/${this.env}/grey_64.png`,
        '128': `images/${this.env}/grey_128.png`,
      },
    });
  }

  on(event) {
    if (event === SITE_EVENT.COOKIE_ADDED && this.site.hasThirdPartyCookies()) {
      this.turnOn();
    }
  }
}
