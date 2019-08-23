import { ConsentOverlayRemover } from '../../../../app/scripts/content_scripts/ConsentOverlayRemover';
import { JSDOM } from 'jsdom';

describe('ConsentOverlayRemover', () => {
  describe('#remove', () => {
    it('removes well known consent requests', () => {
      const {
        window: { document },
      } = new JSDOM(`
        <div id="ccbar"></div>
        <div id="cp-banner"></div>
      `);

      document.domain = 'http://ask.com';

      new ConsentOverlayRemover({ document }).remove();

      const target = document.querySelectorAll('#ccbar, #cp-banner');

      expect(target).toHaveLength(0);
    });

    it('skips unknown elements', () => {
      const {
        window: { document },
      } = new JSDOM(`
        <div id="foo"></div>
      `);

      document.domain = 'http://ask.com';

      new ConsentOverlayRemover({ document }).remove();

      const target = document.querySelectorAll('#foo');

      expect(target).toHaveLength(1);
    });

    it('applies CSS transformations if possible', (done) => {
      const {
        window: { document },
      } = new JSDOM(`
        <body></body>
      `);

      document.domain = 'http://wikia.com';

      new ConsentOverlayRemover({ document }).remove();

      const target = document.querySelector('body');

      if (!target) {
        return done.fail('target cannot be null');
      }

      expect(target.style.overflow).toEqual('inherit');

      done();
    });
  });
});
