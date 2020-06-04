import { fromUrl, parseDomain } from 'parse-domain';

export function getCleanDomain({ withTld = true, url }) {
  const { domain, hostname } = parseDomain(fromUrl(url));

  return withTld ? hostname : domain;
}
