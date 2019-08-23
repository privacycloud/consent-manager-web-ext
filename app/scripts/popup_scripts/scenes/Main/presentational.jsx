/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button } from '../../components/Button';
import { Check } from '../../components/Check';
import { Features } from '../../../features';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Section } from './components/Section';
import { Separator } from '../../components/Separator';
import { Site } from '../../../entities';
import { Subtitle } from '../../components/Subtitle';
import { Text } from '../../components/Text';
import { Title } from '../../components/Title';
import noop from 'lodash/noop';

const container = css`
  padding: 30px 20px 15px;
  position: relative;
  width: 500px;
`;

const logo = css`
  max-width: 48px;
  margin-bottom: 10px;
`;

const header = css`
  margin-bottom: 20px;
`;

const subtitle = css`
  margin-top: 0.5em;
`;

const button = css`
  margin: 30px auto;
  width: 345px;
`;

const check = css`
  position: absolute;
  right: 20px;
  top: 20px;
`;

const footer = css`
  margin-top: 20px;
  text-align: center;
`;

const display = css`
  font-weight: 700;
`;

const withLink = css`
  a {
    color: #4ccfa3;
    font-weight: 700;
    text-decoration: none;
  }
`;
/**
 *
 * @param {object} props
 * @param {boolean} props.isEnabled
 * @param {boolean} props.isReportingSite
 * @param {boolean} props.loading
 * @param {object} props.onReportingSiteClick
 * @param {object} props.onExtensionActivationChange
 * @param {boolean} props.siteHasBeenReported
 * @param {Site|null} props.site
 * @param {import('../../intl').t} props.t
 */
export function MainPresentational({
  isEnabled,
  isReportingSite,
  loading,
  onReportingSiteClick,
  onExtensionActivationChange,
  siteHasBeenReported,
  site,
  t,
}) {
  if (loading) {
    return null;
  }

  const isReportingDisabled = siteHasBeenReported || !site || !site.hasThirdPartyCookies();

  return (
    <div css={container}>
      <img css={logo} src="./img/logo.png" />
      <header css={header}>
        <Title>{t('popupTitle')}</Title>

        <Subtitle css={subtitle}>{t('popupSubtitle')}</Subtitle>
      </header>

      <Section>
        <Text css={display}>{t('howItWorks')}</Text>

        <Text css={withLink} dangerouslySetInnerHTML={{ __html: t('popupReportText') }} />

        <Button css={button} disabled={isReportingDisabled} loading={isReportingSite} onClick={onReportingSiteClick}>
          {t('popupReportButton')}
        </Button>
      </Section>

      {Features.isErrorReportingEnabled() && (
        <Fragment>
          <Separator />

          <Section>
            <Text css={withLink} dangerouslySetInnerHTML={{ __html: t('popupErrorReportText') }} />

            <Button css={button} disabled={!isEnabled} onClick={noop}>
              {t('popupErrorReportButton')}
            </Button>
          </Section>
        </Fragment>
      )}

      <Text css={[footer, withLink]} dangerouslySetInnerHTML={{ __html: t('footer') }} />

      <section css={check}>
        <Check checked={isEnabled} label={t('popupSettingsCheck')} onChange={onExtensionActivationChange} />
      </section>
    </div>
  );
}

MainPresentational.propTypes = {
  isEnabled: PropTypes.bool,
  isReportingSite: PropTypes.bool,
  loading: PropTypes.bool,
  onReportingSiteClick: PropTypes.func.isRequired,
  onExtensionActivationChange: PropTypes.func.isRequired,
  siteHasBeenReported: PropTypes.bool,
  site: PropTypes.instanceOf(Site),
  t: PropTypes.func.isRequired,
};
