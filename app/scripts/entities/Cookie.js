import { getCleanDomain } from '../util/domain';

export class Cookie {
  constructor({ url }) {
    this.url = url;
  }

  isFromSubject({ url }) {
    const myDomain = getCleanDomain({ url: this.url });
    const otherDomain = getCleanDomain({ url });

    return myDomain === otherDomain;
  }

  isThirdPartyCookieFor({ url }) {
    const myDomain = getCleanDomain({ url: this.url, withTld: false });
    const otherDomain = getCleanDomain({ url, withTld: false });

    return myDomain !== otherDomain;
  }
}
