import { ExtensionManager } from '../../../../app/scripts/managers/ExtensionManager';

/**
 * @param {object} data
 */
function stubBrowserExtensionStorage(data) {
  const browser = {
    storage: {
      sync: {
        get: () => Promise.resolve(data),
      },
    },
  };

  global.browser = browser;
}

describe('ExtensionManager', () => {
  /**
   * @type {ExtensionManager}
   */
  let subject;

  beforeEach(() => {
    subject = new ExtensionManager();
  });

  describe('#isExtensionEnabled', () => {
    it('returns true by default', async () => {
      stubBrowserExtensionStorage({});

      await expect(subject.isExtensionEnabled()).resolves.toBe(true);
    });

    it('returns true if it is actually enabled', async () => {
      stubBrowserExtensionStorage({ 'browser-extension': true });

      await expect(subject.isExtensionEnabled()).resolves.toBe(true);
    });

    it('returns false if it is actively disabled', async () => {
      stubBrowserExtensionStorage({ 'browser-extension': false });

      await expect(subject.isExtensionEnabled()).resolves.toBe(false);
    });
  });

  describe('#setStatusTo', () => {
    it('saves the injected status', async () => {
      global.browser = {
        storage: {
          sync: {
            set: jest.fn(),
          },
        },
      };

      await subject.setStatusTo(true);

      expect(global.browser.storage.sync.set).toHaveBeenCalledTimes(1);
      expect(global.browser.storage.sync.set).toHaveBeenCalledWith({ 'browser-extension': true });
    });

    it('throws an error if it does not receive a boolean', async () => {
      // @ts-ignore
      await expect(subject.setStatusTo('foo')).rejects.toThrowError();
    });
  });
});
