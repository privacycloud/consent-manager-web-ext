import { Cookie, SITE_EVENT, Site } from '../../../../app/scripts/entities';
import { IconManager } from '../../../../app/scripts/managers';
import noop from 'lodash/noop';

describe('IconManager', () => {
  beforeAll(() => {
    global.browser = {
      browserAction: {
        setIcon: noop,
      },
    };
  });

  afterAll(() => {
    global.browser = undefined;
  });

  describe('#on', () => {
    it('turns on if there is a new third party cookie', () => {
      const siteWithThirdPartyCookies = new Site({
        cookies: [new Cookie({ url: 'https://third.party.com' })],
        url: 'https://comply.org',
      });

      const subject = new IconManager({ site: siteWithThirdPartyCookies, tabId: 0 });
      const turnOn = jest.spyOn(subject, 'turnOn');

      subject.on(SITE_EVENT.COOKIE_ADDED);

      expect(turnOn).toHaveBeenCalledTimes(1);
    });

    it('does not turn on for new cookies on a site with no third-party cookies', async () => {
      const siteWithNoThirdPartyCookies = new Site({
        cookies: [new Cookie({ url: 'https://comply.com' })],
        url: 'https://comply.org',
      });

      const subject = new IconManager({ site: siteWithNoThirdPartyCookies, tabId: 0 });
      const turnOn = jest.spyOn(subject, 'turnOn');

      subject.on(SITE_EVENT.COOKIE_ADDED);

      expect(turnOn).not.toHaveBeenCalled();
    });

    it('turns off if the site gets forgotten', () => {
      const site = new Site({ url: 'https://comply.org' });

      const subject = new IconManager({ site, tabId: 0 });
      const turnOff = jest.spyOn(subject, 'turnOff');

      subject.on(SITE_EVENT.FORGOTTEN);

      expect(turnOff).toHaveBeenCalledTimes(1);
    });
  });
});
