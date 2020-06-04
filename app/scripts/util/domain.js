import parseDomain from 'parse-domain';

export function getCleanDomain({ withTld = true, url }) {
  const { domain, tld } = parseDomain(url);

  return withTld ? domain + '.' + tld : domain;
}
