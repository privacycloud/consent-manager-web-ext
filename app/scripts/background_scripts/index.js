import { ContentBlocker } from './ContentBlocker';
import { CookieTracker } from './CookieTracker';
import { ExtensionManager } from '../managers';
import { SiteRepository } from '../entities';
import { TabEventListener } from './TabEventListener';
import { providers as urlsToBlock } from './data/providers';

export async function start() {
  const repository = new SiteRepository();

  const isExtensionEnabled = await new ExtensionManager().isExtensionEnabled();

  if (isExtensionEnabled) {
    new ContentBlocker({ urlsToBlock }).start();
    new CookieTracker({ repository }).start();
    new TabEventListener({ repository }).start();
  }

  browser.runtime.onMessage.addListener(({ tab, type }) => {
    if (type !== 'getSite' || !tab.id) {
      return;
    }

    const site = repository.findByTabId(tab.id);

    return Promise.resolve(site && site.toJSON());
  });
}
