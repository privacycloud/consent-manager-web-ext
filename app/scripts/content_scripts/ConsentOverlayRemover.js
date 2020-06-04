import { DomUtils } from './DomUtils';
import { RulesFactory } from './rules';
import { modifiers as cssModifiers } from './rules/cssModifiers';
import parseDomain from 'parse-domain';

export class ConsentOverlayRemover {
  constructor({ document }) {
    this.document = document;
    this.utils = new DomUtils({ document, rules: RulesFactory() });
  }

  remove() {
    const { domain, tld } = parseDomain(this.document.domain);
    const normalizedDomain = `${domain}.${tld}`;

    const elements = this.utils.findElements(normalizedDomain);

    if (elements.length > 0) {
      this.utils.deleteElements(elements);
    }

    const modifier = cssModifiers[normalizedDomain];

    if (modifier) {
      const bodyElement = this.document.querySelector(`${modifier.element}`);

      if (bodyElement) {
        bodyElement.style[modifier.css.property] = modifier.css.value;
      }
    }
  }
}
