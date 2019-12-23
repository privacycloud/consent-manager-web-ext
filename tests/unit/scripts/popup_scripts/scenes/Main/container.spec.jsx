import { render, screen, waitForElement } from '@testing-library/react';
import { Main } from '../../../../../../app/scripts/popup_scripts/scenes/Main';
import React from 'react';
import browser from 'sinon-chrome';
import messages from '../../../../../../app/_locales/en/messages.json';
import sinon from 'sinon';

describe('Main', () => {
  beforeAll(() => {
    browser.registerPlugin(new browser.plugins.I18nPlugin(messages));

    global.browser = browser;

    browser.tabs.query.returns(Promise.resolve([]));
  });

  describe('with the extension disabled', () => {
    it('shows the right text', async () => {
      browser.storage.sync.get.withArgs('browser-extension').returns(Promise.resolve({ 'browser-extension': false }));

      browser.runtime.sendMessage
        .withArgs(sinon.match({ type: 'getSite' }))
        .returns(Promise.resolve({ url: 'https://comply.org', cookies: [] }));

      render(<Main />);

      const status = await waitForElement(() =>
        screen.getByText(/Activate this extension to surf the web without annoying cookie pop-ups/),
      );

      expect(status).toBeDefined();
    });
  });

  describe('with the extension enabled', () => {
    beforeAll(() => {
      browser.storage.sync.get.withArgs('browser-extension').returns(Promise.resolve({ 'browser-extension': true }));
    });

    it('lets the user knows that they are browsing without third-party cookies, if that is the case', async () => {
      browser.runtime.sendMessage
        .withArgs(sinon.match({ type: 'getSite' }))
        .returns(Promise.resolve({ url: 'https://comply.org', cookies: [] }));

      render(<Main />);

      const status = await waitForElement(() =>
        screen.getByText(/It seems that this site is not setting 3rd party cookies, enjoy it/),
      );

      expect(status).toBeDefined();
    });

    it('lets the user knows that they are browsing with unwanted third-party cookies, if that is the case', async () => {
      browser.runtime.sendMessage
        .withArgs(sinon.match({ type: 'getSite' }))
        .returns(Promise.resolve({ url: 'https://comply.org', cookies: [{ url: 'https://third.party.com' }] }));

      render(<Main />);

      const status = await waitForElement(() =>
        screen.getByText(/This site seems to be serving 3rd party cookies, which you never accepted/),
      );

      expect(status).toBeDefined();
    });
  });
});
