import { Main } from './popup_scripts/scenes/Main';
import React from 'react';
import ReactDOM from 'react-dom';
import { TranslationContext } from './popup_scripts/context/translation';
import { t } from './popup_scripts/intl';

ReactDOM.render(
  <TranslationContext.Provider value={{ t }}>
    <Main />
  </TranslationContext.Provider>,
  document.getElementById('root'),
);
