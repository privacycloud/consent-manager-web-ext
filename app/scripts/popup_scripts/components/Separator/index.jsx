/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const styles = css`
  border: 1px solid #e3e3e3;
`;

export function Separator() {
  return <hr css={styles} />;
}
