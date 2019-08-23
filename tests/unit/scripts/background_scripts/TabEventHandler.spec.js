import { Site, SiteRepository } from '../../../../app/scripts/entities';
import { IconManager } from '../../../../app/scripts/managers';
import { TabEventHandler } from '../../../../app/scripts/background_scripts/TabEventHandler';
import noop from 'lodash/noop';
import tap from 'lodash/tap';

describe('TabEventHandler', () => {
  describe('#onCreateTab', () => {
    /**
     * @type {SiteRepository}
     */
    let repository;

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

    beforeEach(() => {
      repository = new SiteRepository();
    });

    it('adds a new site to the repository', async () => {
      const add = jest.spyOn(repository, 'add');

      const subject = new TabEventHandler({ repository });
      subject.onCreateTab(0, 'https://comply.org');

      expect(add).toHaveBeenCalledWith(expect.objectContaining({ tabId: 0, site: expect.any(Site) }));
    });

    it('binds an icon manager with the new site', () => {
      const addObserver = jest.spyOn(Site.prototype, 'addObserver');

      const subject = new TabEventHandler({ repository });

      subject.onCreateTab(0, 'https://comply.org');

      expect(addObserver).toHaveBeenCalledWith(expect.any(IconManager));
    });
  });

  describe('#onRemoveTab', () => {
    it('forgets the site related with the removed tab', () => {
      const FAKE_TAB_ID = 0;

      const repository = tap(new SiteRepository(), (repo) =>
        repo.add({ tabId: FAKE_TAB_ID, site: new Site({ url: 'https://comply.org' }) }),
      );

      const forgetByTabId = jest.spyOn(repository, 'forgetByTabId');

      const subject = new TabEventHandler({ repository });

      subject.onRemoveTab(FAKE_TAB_ID);

      expect(forgetByTabId).toHaveBeenCalledWith(FAKE_TAB_ID);
    });
  });
});
