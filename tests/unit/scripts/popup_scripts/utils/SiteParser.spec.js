import { Site } from '../../../../../app/scripts/entities';
import { SiteParser } from '../../../../../app/scripts/popup_scripts/utils/SiteParser';

describe('SiteParser', () => {
  /**
   * @type {object}
   */
  let json;

  beforeEach(() => {
    json = {
      url: 'https://comply.org',
      cookies: [{ url: 'https://third.party.com' }],
    };
  });

  it('does not throw an exception for a valid json', () => {
    const subject = new SiteParser();

    expect(() => subject.parse({ json })).not.toThrowError();
  });

  it('returns a Site instance', () => {
    const subject = new SiteParser();
    const site = subject.parse({ json });

    expect(site).toBeInstanceOf(Site);
  });

  it('builds the Site successfully', () => {
    const subject = new SiteParser();
    const site = subject.parse({ json });

    expect(site.url).toEqual('https://comply.org');
    expect(site.cookies).toHaveLength(1);
    expect(site.hasThirdPartyCookies()).toBe(true);
  });

  it('throws an exception if the input is invalid', () => {
    const invalidJson = { cookies: [{ url: 'https://third.party.com' }] };

    const subject = new SiteParser();

    expect(() => subject.parse({ json: invalidJson })).toThrowError();
  });
});
