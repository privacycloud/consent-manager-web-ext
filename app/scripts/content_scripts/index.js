import { ConsentOverlayRemover } from './ConsentOverlayRemover';
import { ExtensionManager } from '../managers/ExtensionManager';

export async function start() {
  window.addEventListener('load', async () => {
    const isExtensionEnabled = await new ExtensionManager().isExtensionEnabled();

    if (isExtensionEnabled) {
      new ConsentOverlayRemover({ document: window.document }).remove();
    }
  });
}
