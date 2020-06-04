export class DomUtils {
  constructor({ document, rules }) {
    this.document = document;
    this.rules = rules;
  }

  deleteElements(elements) {
    elements.forEach((element) => element.remove());
  }

  findElements(domain) {
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
