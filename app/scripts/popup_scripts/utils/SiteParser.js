import { Cookie } from '../../entities';
import { Site } from '../../entities';

export class SiteParser {
  parse({ json }) {
    const { cookies, url } = json || { cookies: [], url: '' };

    return new Site({
      cookies: cookies.map((cookie) => new Cookie(cookie)),
      url,
    });
  }
}
