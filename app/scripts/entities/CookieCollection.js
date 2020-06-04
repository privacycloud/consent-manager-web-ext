export class CookieCollection {
  constructor({ cookies }) {
    this.collection = new Set(cookies);
  }

  add({ cookie }) {
    this.collection.add(cookie);
  }

  findBySubject({ url }) {
    const cookies = Array.from(this.collection).filter((cookie) => cookie.isFromSubject({ url }));

    return new CookieCollection({ cookies });
  }

  includes({ cookie }) {
    return this.collection.has(cookie);
  }

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
