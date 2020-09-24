import { Cookie, SITE_EVENT, Site } from '../../../../app/scripts/entities';
import { IconManager } from '../../../../app/scripts/managers';

describe('IconManager', () => {
  beforeAll(() => {
    global.browser = {
      browserAction: {
        setIcon: jest.fn(),
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

      const subject = new IconManager({ env: 'production', site: siteWithThirdPartyCookies, tabId: 0 });

      subject.on(SITE_EVENT.COOKIE_ADDED);

      expect(global.browser.browserAction.setIcon).toHaveBeenCalledWith(
        expect.objectContaining({
          path: {
            '16': `images/production/red_16.png`,
            '32': `images/production/red_32.png`,
            '64': `images/production/red_64.png`,
            '128': `images/production/red_128.png`,
          },
        }),
      );
    });

    it('does not turn on for new cookies on a site with no third-party cookies', async () => {
      const siteWithNoThirdPartyCookies = new Site({
        cookies: [new Cookie({ url: 'https://comply.com' })],
        url: 'https://comply.org',
      });

      const subject = new IconManager({ site: siteWithNoThirdPartyCookies, tabId: 0 });

      subject.on(SITE_EVENT.COOKIE_ADDED);

      expect(global.browser.browserAction.setIcon).not.toHaveBeenCalled();
    });
  });
});
