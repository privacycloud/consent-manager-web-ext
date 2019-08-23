export class ExtensionManager {
  async isExtensionEnabled() {
    const data = await browser.storage.sync.get('browser-extension');

    return !('browser-extension' in data) || data['browser-extension'] === true;
  }
  /**
   *
   * @param {boolean} enabled
   */
  async setStatusTo(enabled) {
    if (typeof enabled !== 'boolean') {
      throw new Error('Invalid argument');
    }

    await browser.storage.sync.set({ 'browser-extension': enabled });
  }
}
