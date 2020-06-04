import React from 'react';
import { TranslationContext } from '../context/translation';

export function withTranslation(Component) {
  return function TranslatedComponent(props) {
    return <TranslationContext.Consumer>{({ t }) => <Component {...props} t={t} />}</TranslationContext.Consumer>;
  };
}
