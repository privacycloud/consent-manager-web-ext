/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { Site } from '../../../../../entities';
import { Text } from '../../../../components/Text';

const display = css`
  font-weight: 700;
`;

const warning = css`
  color: red;
`;

/**
 *
 * @param {object} props
 * @param {boolean} props.isEnabled
 * @param {Site} props.site
 * @param {typeof import('../../../../intl').t} props.t
 */
export function StatusText({ isEnabled, site, t }) {
  if (!isEnabled) {
    return <Text css={display}>{t('howItWorks')}</Text>;
  }

  const statusLabel = `siteWithThirdPartyCookies__${site.hasThirdPartyCookies()}`;

  return <Text css={[display, site.hasThirdPartyCookies() && warning]}>{t(statusLabel)}</Text>;
}

StatusText.propTypes = {
  isEnabled: PropTypes.bool,
  site: PropTypes.instanceOf(Site),
  t: PropTypes.func.isRequired,
};
