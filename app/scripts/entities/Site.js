import { CookieCollection } from './CookieCollection';

export const SITE_EVENT = {
  COOKIE_ADDED: 'site:cookie:added',
  FORGOTTEN: 'site:forgotten',
};

export class Site {
  constructor({ cookies, url }) {
    if (null === url || typeof url === 'undefined') {
      throw new Error('Site is expected to have a primary url');
    }

    this.cookies = new CookieCollection({ cookies });
    this.observers = [];
    this.url = url;
  }

  addCookie({ cookie }) {
    this.cookies.add({ cookie });

    this.notify(SITE_EVENT.COOKIE_ADDED);
  }

  hasThirdPartyCookies() {
    return this.cookies.hasThirdPartyCookiesFor({ url: this.url });
  }

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

  hasThirdPartyCookiesFor({ url }) {
    return this.cookies.findBySubject({ url }).hasThirdPartyCookiesFor({ url: this.url });
  }

  getUrl() {
    return this.url;
  }

  getObservers() {
    return this.observers;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

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
