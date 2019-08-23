import React from 'react';
import { TranslationContext } from '../context/translation';

/**
 * @param {React.ComponentClass} Component
 * @returns {(props: object) => JSX.Element}
 */
export function withTranslation(Component) {
  return function TranslatedComponent(props) {
    return (
      <TranslationContext.Consumer>
        {/**
         * @param {object|undefined} context
         * @param {import('./index').t} context.t
         */
        ({ t }) => <Component {...props} t={t} />}
      </TranslationContext.Consumer>
    );
  };
}
