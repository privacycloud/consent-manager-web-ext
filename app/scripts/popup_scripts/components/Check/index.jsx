/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import PropTypes from 'prop-types';

import { Text } from '../Text';

const container = css`
  align-items: center;
  display: flex;

  cursor: pointer;
`;

const text = css`
  margin-right: 10px;
`;

const check = css`
  align-items: center;
  border-width: 1.5px;
  border-style: solid;
  display: flex;
  height: 20px;
  justify-content: center;
  width: 20px;

  border-radius: 100%;
`;

const checkIsChecked = css`
  border-color: #4ccfa3;
  background-color: #4ccfa3;
`;

const checkIsNotChecked = css`
  border-color: #b9b9b9;
`;

const icon = css`
  max-height: 150%;
  max-width: 150%;
`;

/**
 * @callback onChange
 * @param {React.ChangeEvent<HTMLInputElement>} event
 */

/**
 * @param {object} props
 * @param {boolean} props.checked
 * @param {string} props.label
 * @param {onChange} props.onChange
 */
export function Check({ checked, label, onChange }) {
  return (
    <label css={container}>
      <input css={{ display: 'none' }} checked={checked} onChange={onChange} type="checkbox" />

      <Text css={text}>{label}</Text>

      <div css={[check, checked ? checkIsChecked : checkIsNotChecked]}>
        <img css={icon} src={`./img/components/Check/tick-${checked ? 'on' : 'off'}.svg`} />
      </div>
    </label>
  );
}

Check.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};
