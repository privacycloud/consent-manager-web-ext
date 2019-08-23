export class DomUtils {
  /**
   * @param {object} options
   * @param {Document} options.document
   * @param {Rules} options.rules
   */
  constructor({ document, rules }) {
    this.document = document;
    this.rules = rules;
  }

  /**
   * @param {Element[]} elements
   */
  deleteElements(elements) {
    elements.forEach((element) => element.remove());
  }

  /**
   * @param {string} domain
   */
  findElements(domain) {
    /**
     * @type {Element[]}
     */
    let elements = [];

    if (this.rules.domainBased[domain]) {
      elements = elements.concat(Array.from(this.document.querySelectorAll(`${this.rules.domainBased[domain]}`)));
    }

    this.rules.cssPropertiesBased.forEach((classProperty) => {
      elements = elements.concat(Array.from(this.document.querySelectorAll(classProperty)));
    });

    return elements;
  }
}
