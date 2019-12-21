/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Check } from '../../components/Check';
import PropTypes from 'prop-types';
import { Section } from './components/Section';
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
 * @param {boolean} props.loading
 * @param {object} props.onExtensionActivationChange
 * @param {import('../../intl').t} props.t
 */
export function MainPresentational({ isEnabled, loading, onExtensionActivationChange, t }) {
  if (loading) {
    return null;
  }

  return (
    <div css={container}>
      <img css={logo} src="./img/logo.png" />
      <header css={header}>
        <Title>{t('popupTitle')}</Title>

        <Subtitle css={subtitle}>{t('popupSubtitle')}</Subtitle>
      </header>

      <Section>
        <Text css={display}>{t('howItWorks')}</Text>

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
  t: PropTypes.func.isRequired,
};
