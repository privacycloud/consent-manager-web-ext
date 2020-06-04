import { rules as cssPropertiesBasedRules } from './cssPropertiesBasedRules';
import { rules as customDomainBasedRules } from './customDomainBasedRules';
import { rules as domainBasedRules } from './domainBasedRules';

export function RulesFactory() {
  return {
    domainBased: Object.assign({}, domainBasedRules, customDomainBasedRules),

    cssPropertiesBased: cssPropertiesBasedRules,
  };
}
