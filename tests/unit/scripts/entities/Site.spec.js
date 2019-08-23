import { Cookie, SITE_EVENT, Site } from '../../../../app/scripts/entities';

const SITE_URL = 'http://foo.bar';

describe('Site', () => {
  /**
   * @type {Site}
   */
  let site;

  beforeEach(() => {
    site = new Site({ url: SITE_URL });
  });

  it('has a url', () => {
    expect(site.getUrl()).toEqual(SITE_URL);
  });

  it('throws an exception if it is created without url', () => {
    // @ts-ignore
    expect(() => new Site({})).toThrowError();
  });

  it('has an empty list of cookies by default', () => {
    expect(site.cookies).toHaveLength(0);
  });

  it('knows if there are third party cookies', () => {
    const cookie = new Cookie({ url: 'http://third.party.com' });

    const siteWithCookies = new Site({ cookies: [cookie], url: 'http://comply.org' });

    expect(siteWithCookies.hasThirdPartyCookies()).toBe(true);
  });

  it('knows if there is not any third party cookies', () => {
    const cookie = new Cookie({ url: 'http://first.party.com' });

    const siteWithCookies = new Site({ cookies: [cookie], url: 'http://first.party.com' });

    expect(siteWithCookies.isThirdPartyCookie({ cookie })).toBe(false);
  });

  it('knows if there are third party cookies for a subject', () => {
    const cookie = new Cookie({ url: 'http://third.party.com/sdklfjsdlkfjlkwer/asdsaDeed?asd=a' });

    const siteWithCookies = new Site({ cookies: [cookie], url: 'http://comply.org' });

    expect(siteWithCookies.hasThirdPartyCookiesFor({ url: 'http://third.party.com/download' })).toBe(true);
  });

  it('skips tld to detect third-party cookies', () => {
    const cookie = new Cookie({ url: 'http://third.party.es' });

    const siteWithCookies = new Site({ cookies: [cookie], url: 'http://third.party.com' });

    expect(siteWithCookies.hasThirdPartyCookies()).toBe(false);
  });

  it('knows if a cookie is potentially part of its third party cookies', () => {
    const cookie = new Cookie({ url: 'http://third.party.com' });

    const siteWithCookies = new Site({ cookies: [cookie], url: 'http://comply.org' });

    expect(siteWithCookies.isThirdPartyCookie({ cookie })).toBe(true);
  });

  it('knows if a cookie is not potentially part of its third party cookies', () => {
    const cookie = new Cookie({ url: 'http://third.party.com' });

    const siteWithCookies = new Site({ cookies: [cookie], url: 'http://third.party.es' });

    expect(siteWithCookies.isThirdPartyCookie({ cookie })).toBe(false);
  });

  it('does not have third party cookies if it does not have cookies', () => {
    const cookie = new Cookie({ url: 'http://third.party.com' });

    const siteWithCookies = new Site({ cookies: [], url: 'http://comply.org' });

    expect(siteWithCookies.isThirdPartyCookie({ cookie })).toBe(false);
  });

  describe('managing cookies', () => {
    it('has the ability to add new cookies', () => {
      const cookie = new Cookie({ url: 'http://third.party.com' });

      site.addCookie({ cookie });

      expect(site.numberOfCookies()).toBe(1);
    });

    it('does not contain duplicated cookies', () => {
      const cookie = new Cookie({ url: 'http://third.party.com' });

      site.addCookie({ cookie });
      site.addCookie({ cookie });

      expect(site.numberOfCookies()).toBe(1);
    });
  });

  describe('working with observers', () => {
    /**
     * @type {Observer}
     */
    let observer;

    beforeEach(() => {
      observer = { on: jest.fn() };
    });

    it('returns their linked observers', () => {
      expect(site.getObservers()).toEqual([]);
    });

    it('has the ability to add new observers', () => {
      site.addObserver(observer);

      expect(site.getObservers()).toContain(observer);
    });

    it('has the ability to notify observers for an evet', () => {
      site.addObserver(observer);
      site.notify(SITE_EVENT.FORGOTTEN);

      expect(observer.on).toHaveBeenCalledWith(SITE_EVENT.FORGOTTEN);
    });

    it('gets rid of all the observers when forgotten', () => {
      site.addObserver(observer);
      site.forget();

      expect(site.getObservers()).toHaveLength(0);
    });

    it('notifies observers about the forgotten event', () => {
      site.addObserver(observer);

      site.forget();

      expect(observer.on).toHaveBeenCalledWith(SITE_EVENT.FORGOTTEN);
    });
  });

  it('knows how to present itself as a JSON', () => {
    const json = site.toJSON();

    expect(json).toMatchObject({ cookies: [], url: SITE_URL });
  });
});
