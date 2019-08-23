import { CookieCollection } from './CookieCollection';

export const SITE_EVENT = {
  COOKIE_ADDED: 'site:cookie:added',
  FORGOTTEN: 'site:forgotten',
};

export class Site {
  /**
   *
   * @param {object} options
   * @param {Array<import('./Cookie').Cookie>} [options.cookies]
   * @param {string} options.url
   */
  constructor({ cookies, url }) {
    if (null === url || typeof url === 'undefined') {
      throw new Error('Site is expected to have a primary url');
    }

    /**
     * @private
     */
    this.cookies = new CookieCollection({ cookies });

    /**
     * @private
     * @type {Observer[]}
     */
    this.observers = [];

    /**
     * @private
     */
    this.url = url;
  }

  /**
   * @param {object} options
   * @param {import('./Cookie').Cookie} options.cookie
   */
  addCookie({ cookie }) {
    this.cookies.add({ cookie });

    this.notify(SITE_EVENT.COOKIE_ADDED);
  }

  hasThirdPartyCookies() {
    return this.cookies.hasThirdPartyCookiesFor({ url: this.url });
  }

  /**
   * @param {object} options
   * @param {import('./Cookie').Cookie} options.cookie
   */
  isThirdPartyCookie({ cookie }) {
    const isCookieIncluded = this.cookies.includes({ cookie });

    if (!isCookieIncluded) {
      return false;
    }

    return cookie.isThirdPartyCookieFor({ url: this.url });
  }

  numberOfCookies() {
    return this.cookies.length;
  }

  /**
   * @param {object} options
   * @param {string} options.url
   */
  hasThirdPartyCookiesFor({ url }) {
    return this.cookies.findBySubject({ url }).hasThirdPartyCookiesFor({ url: this.url });
  }

  getUrl() {
    return this.url;
  }

  getObservers() {
    return this.observers;
  }

  /**
   * @param {Observer} observer
   */
  addObserver(observer) {
    this.observers.push(observer);
  }

  /**
   * @param {string} event
   */
  notify(event) {
    this.observers.forEach((observer) => observer.on(event));
  }

  forget() {
    this.notify(SITE_EVENT.FORGOTTEN);

    this.observers.length = 0;
  }

  toJSON() {
    const { url, cookies } = this;

    return {
      cookies: cookies.toArray(),
      url,
    };
  }
}
