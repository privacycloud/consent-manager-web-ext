import { CookieTracker } from '../../../../app/scripts/background_scripts/CookieTracker';
import { SiteRepository } from '../../../../app/scripts/entities';

describe('CookieTracker', () => {
  describe('#start', () => {
    beforeEach(() => {
      global.browser = {
        webRequest: {
          onCompleted: {
            addListener: jest.fn(),
          },
          onHeadersReceived: {
            addListener: jest.fn(),
          },
        },
      };
    });

    afterEach(() => {
      global.browser = undefined;
      process.env.VENDOR = undefined;
    });

    it('sets the right configuration to listen to all the required headers in Chrome', async () => {
      process.env.VENDOR = 'chrome';

      new CookieTracker({ repository: new SiteRepository() }).start();

      expect(global.browser.webRequest.onHeadersReceived.addListener).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        ['blocking', 'responseHeaders', 'extraHeaders'],
      );
    });

    it('avoids "extraHeaders" for other vendors than Chrome', async () => {
      process.env.VENDOR = 'firefox';

      new CookieTracker({ repository: new SiteRepository() }).start();

      expect(global.browser.webRequest.onHeadersReceived.addListener).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        ['blocking', 'responseHeaders'],
      );
    });
  });
});
