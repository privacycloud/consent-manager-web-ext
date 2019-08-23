import { Cookie } from '../../entities';
import { Site } from '../../entities';

export class SiteParser {
  /**
   *
   * @param {object} options
   * @param {object} options.json
   */
  parse({ json }) {
    const { cookies, url } = json || { cookies: [], url: '' };

    return new Site({
      cookies: cookies.map(
        /**
         * @param {object} cookie
         */
        (cookie) => new Cookie(cookie),
      ),
      url,
    });
  }
}
