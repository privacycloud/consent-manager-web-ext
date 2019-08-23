export class CookieCollection {
  /**
   * @param {object} options
   * @param {Array<import('./Cookie').Cookie>} options.cookies
   */
  constructor({ cookies }) {
    this.collection = new Set(cookies);
  }

  /**
   * @param {object} options
   * @param {import('./Cookie').Cookie} options.cookie
   */
  add({ cookie }) {
    this.collection.add(cookie);
  }

  /**
   * @param {object} options
   * @param {string} options.url
   */
  findBySubject({ url }) {
    const cookies = Array.from(this.collection).filter((cookie) => cookie.isFromSubject({ url }));

    return new CookieCollection({ cookies });
  }

  /**
   * @param {object} options
   * @param {import('./Cookie').Cookie} options.cookie
   */
  includes({ cookie }) {
    return this.collection.has(cookie);
  }

  /**
   * @param {object} options
   * @param {string} options.url
   */
  hasThirdPartyCookiesFor({ url }) {
    return Array.from(this.collection).some((cookie) => cookie.isThirdPartyCookieFor({ url }));
  }

  get length() {
    return this.collection.size;
  }

  toArray() {
    return Array.from(this.collection);
  }
}
