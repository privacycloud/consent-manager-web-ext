/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { Spinner } from '../Spinner';

const style = css`
  border: 0;
  display: block;
  font-size: 15px;
  margin: 1em 0;
  padding: 15px 10px;

  background-color: #4ccfa3;
  border-radius: 3px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  outline: 0;

  transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: #22bb88;
  }

  &[disabled],
  &[disabled]:hover {
    background-color: #dcdcdc;

    pointer-events: none;
  }
`;

const loadingButton = css`
  pointer-events: none;
`;

/**
 * @callback onClick
 * @param  {React.MouseEvent} event
 */

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} props.disabled
 * @param {boolean} [props.loading]
 * @param {onClick} props.onClick
 */
export function Button({ children, disabled, loading, onClick, ...props }) {
  return (
    <button css={[style, loading && loadingButton]} disabled={disabled} onClick={onClick} {...props}>
      {loading ? <Spinner color="#fff" /> : children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
