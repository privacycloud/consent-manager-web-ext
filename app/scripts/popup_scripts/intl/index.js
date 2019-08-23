export { withTranslation } from './withTranslation';

/**
 * Translation function
 * @param {string} ns namespace
 * @returns {string} translation
 */
export function t(ns) {
  return browser.i18n.getMessage(ns);
}
