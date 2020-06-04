/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Check } from '../../components/Check';
import PropTypes from 'prop-types';
import { Section } from './components/Section';
import { Site } from '../../../entities';
import { StatusText } from './components/StatusText';
import { Subtitle } from '../../components/Subtitle';
import { Text } from '../../components/Text';
import { Title } from '../../components/Title';

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

const check = css`
  position: absolute;
  right: 20px;
  top: 20px;
`;

const withLink = css`
  a {
    color: #4ccfa3;
    font-weight: 700;
    text-decoration: none;
  }
`;

export function MainPresentational({ isEnabled, loading, onExtensionActivationChange, site, t }) {
  if (loading) {
    return null;
  }

  if (!site) {
    throw new Error('ERROR: A site is required to load the pop-up');
  }

  return (
    <div css={container}>
      <img css={logo} src="./img/logo.png" />
      <header css={header}>
        <Title>{t('popupTitle')}</Title>

        <Subtitle css={subtitle}>{t('popupSubtitle')}</Subtitle>
      </header>

      <Section>
        <StatusText isEnabled={isEnabled} site={site} t={t} />

        <Text css={withLink} dangerouslySetInnerHTML={{ __html: t('contributing') }} />
      </Section>

      <section css={check}>
        <Check checked={isEnabled} label={t('popupSettingsCheck')} onChange={onExtensionActivationChange} />
      </section>
    </div>
  );
}

MainPresentational.propTypes = {
  isEnabled: PropTypes.bool,
  loading: PropTypes.bool,
  onExtensionActivationChange: PropTypes.func.isRequired,
  site: PropTypes.instanceOf(Site),
  t: PropTypes.func.isRequired,
};
