import { fromUrl, parseDomain } from 'parse-domain';
import { DomUtils } from './DomUtils';
import { RulesFactory } from './rules';
import { modifiers as cssModifiers } from './rules/cssModifiers';

export class ConsentOverlayRemover {
  constructor({ document }) {
    this.document = document;
    this.utils = new DomUtils({ document, rules: RulesFactory() });
  }

  remove() {
    const { hostname } = parseDomain(fromUrl(this.document.domain));

    const elements = this.utils.findElements(hostname);

    if (elements.length > 0) {
      this.utils.deleteElements(elements);
    }

    const modifier = cssModifiers[hostname];

    if (modifier) {
      const bodyElement = this.document.querySelector(`${modifier.element}`);

      if (bodyElement) {
        bodyElement.style[modifier.css.property] = modifier.css.value;
      }
    }
  }
}
