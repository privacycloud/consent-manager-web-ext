import { DomUtils } from '../../../../app/scripts/content_scripts/DomUtils';
import { JSDOM } from 'jsdom';

describe('DomUtils', () => {
  describe('#deleteElements', () => {
    it('deletes elements from the document', () => {
      const {
        window: { document },
      } = new JSDOM(`
        <section>
          <div id="hello">Hello world</div>
        </section>`);

      const { 0: element } = document.querySelectorAll('#hello');

      const subject = new DomUtils({
        document,
        rules: { cssPropertiesBased: [], domainBased: {} },
      });

      subject.deleteElements([element]);

      expect(document.querySelector('#hello')).toBeNull();
    });
  });

  describe('#findElements', () => {
    it('finds elements by using the dictionary', () => {
      const dictionary = { 'foo.com': '#alertBar', 'bar.com': '#RegCCO' };

      const {
        window: { document },
      } = new JSDOM(`
        <div id="alertBar">
          Hello world
        </div>`);

      const subject = new DomUtils({
        document,
        rules: { cssPropertiesBased: [], domainBased: dictionary },
      });

      const { 0: element } = subject.findElements('foo.com');

      expect(element.id).toEqual('alertBar');
    });

    it('finds elements by using the generic rules', () => {
      const dictionary = { 'foo.com': '#alertBar', 'bar.com': '#RegCCO' };
      const generic = ['#differentId'];

      const {
        window: { document },
      } = new JSDOM(`
        <div id="differentId">
          Hello world
        </div>`);

      const subject = new DomUtils({
        document,
        rules: { cssPropertiesBased: generic, domainBased: dictionary },
      });

      const { 0: element } = subject.findElements('foo.com');

      expect(element.id).toEqual('differentId');
    });

    it('finds no element if there is no match', () => {
      const dictionary = { 'foo.com': '#alertBar', 'bar.com': '#RegCCO' };
      const generic = ['#differentId'];

      const {
        window: { document },
      } = new JSDOM(`
        <div id="yetAnotherId">
          Hello world
        </div>`);

      const subject = new DomUtils({
        document,
        rules: { cssPropertiesBased: generic, domainBased: dictionary },
      });

      const elements = subject.findElements('foo.com');

      expect(elements).toHaveLength(0);
    });
  });
});
