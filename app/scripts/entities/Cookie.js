import { getCleanDomain } from '../util/domain';

export class Cookie {
  /**
   * @param {object} options
   * @param {string} options.url
   */
  constructor({ url }) {
    this.url = url;
  }

  /**
   * @param {object} options
   * @param {string} options.url
   */
  isFromSubject({ url }) {
    const myDomain = getCleanDomain({ url: this.url });
    const otherDomain = getCleanDomain({ url });

    return myDomain === otherDomain;
  }

  /**
   * @param {object} options
   * @param {string} options.url
   */
  isThirdPartyCookieFor({ url }) {
    const myDomain = getCleanDomain({ url: this.url, withTld: false });
    const otherDomain = getCleanDomain({ url, withTld: false });

    return myDomain !== otherDomain;
  }
}
