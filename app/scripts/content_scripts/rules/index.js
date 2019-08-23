import { rules as cssPropertiesBasedRules } from './cssPropertiesBasedRules';
import { rules as customDomainBasedRules } from './customDomainBasedRules';
import { rules as domainBasedRules } from './domainBasedRules';

/**
 * @returns {Rules}
 */
export function RulesFactory() {
  return {
    /**
     * @type {Object.<string, string>}
     */
    domainBased: Object.assign({}, domainBasedRules, customDomainBasedRules),

    cssPropertiesBased: cssPropertiesBasedRules,
  };
}
