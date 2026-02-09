import PropTypes from 'prop-types';

import { shadows } from 'helpers/style-utils';
import oc from 'open-color';
import styled from 'styled-components';

import withRipple from './withRipple';

function getBgColor(props) {
  let color = oc.indigo[7];
  let colorDark = oc.indigo[8];

  // Determine color based on props
  if (props.secondary) {
    color = oc.violet[7];
    colorDark = oc.violet[8];
  }
  if (props.info) {
    color = oc.gray[7];
    colorDark = oc.gray[8];
  }
  if (props.danger) {
    color = oc.red[7];
    colorDark = oc.red[8];
  }
  if (props.success) {
    color = oc.lime[7];
    colorDark = oc.lime[8];
  }
  if (props.outline || props.clear) {
    color = 'transparent';
    colorDark = 'transparent';
  }

  /* eslint-disable max-len */
  return `background: ${color}; background: linear-gradient(to bottom, ${color} 0%, ${colorDark} 100%);`;
  /* eslint-enable max-len */
}

function getHoverColor(props) {
  let color = props.theme.primary;
  if (props.secondary) color = props.theme.surfaceVariant;
  if (props.info) color = props.theme.info;
  if (props.danger) color = props.theme.danger;
  if (props.success) color = props.theme.success;
  if (props.clear) color = 'transparent';

  return color;
}

function getColor(props) {
  if (props.primary) return props.theme.surface;
  if (props.secondary) return props.theme.surfaceContainerHigh;
  if (props.danger) return props.theme.error;
  return props.theme.surface; // default
}

const ButtonWrapper = styled.button`
  outline: none;
  font-size: 14px;
  padding: 4px 8px;
  font-weight: 550;
  
  width: ${props => props.w || 'auto'};
  border-style: solid;
  border-width: ${props => props.outline && !props.clear ? '1px' : '0px'};
  border-radius: 10px;
  border-color: ${props => props.theme.outline};
  color: ${props => props.primary || props.clear ? getColor(props) : props.theme.onSurface };
  background: ${props => props.primary || props.clear ? props.theme.primary : getColor(props) };

  ${props => props.disabled && 'opacity: 0.5; cursor: not-allowed;'};
  ${props => props.small && 'padding: 4px 8px;'}
  ${props => props.large && 'padding: 12px 20px;'}
  ${props => props.small && 'font-size: 0.8rem;'}
  ${props => props.large && 'font-size: 1.5rem;'}

  &:hover {
    filter: brightness(1.1);
  }


  &:active {
    filter: brightness(0.9);
  }
    border: 1px solid ${props => props.theme.outline};
    drop-shadow: ${shadows.sm}
    overflow: hidden;
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${props => props.disabled && 'pointer-events: none;'};
`;

const Button = ({ children, ...rest }) => (
  <ButtonWrapper {...rest}>
    <ButtonContent disabled={rest.disabled}>
      {children}
    </ButtonContent>
  </ButtonWrapper>
);

Button.propTypes = {
  children: PropTypes.any,
};

export default withRipple(Button);
