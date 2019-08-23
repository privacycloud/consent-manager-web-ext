import parseDomain from 'parse-domain';

/**
 * Utility function to extract domain information from any url
 *
 * @param {object} options
 * @param {boolean} [options.withTld] optional
 * @param {string} options.url
 */
export function getCleanDomain({ withTld = true, url }) {
  const { domain, tld } = parseDomain(url);

  return withTld ? domain + '.' + tld : domain;
}
