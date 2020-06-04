export { withTranslation } from './withTranslation';

export function t(ns) {
  return browser.i18n.getMessage(ns);
}
