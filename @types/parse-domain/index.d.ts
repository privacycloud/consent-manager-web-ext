declare module 'parse-domain' {
  type UrlInfo = {
    domain: string;
    subdomain: string;
    tld: string;
  };

  export default function(url: string): UrlInfo;
}
