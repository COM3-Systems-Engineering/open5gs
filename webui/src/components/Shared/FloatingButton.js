import PropTypes from 'prop-types';

import { shadows } from 'helpers/style-utils';
import AddIcon from 'react-icons/lib/md/add';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;

  border: 1px solid ${p => p.theme.outline};
  color: ${p => p.theme.onPrimary};
  background: ${p => p.theme.primary};
  box-shadow: ${shadows.md};

  border-radius: 2rem;
  font-size: 2rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all .15s;

  &:hover {
  transform: translateY(-2px);
    filter: brightness(1.2);
    box-shadow: ${shadows.xl};
  }
`;

const FloatingButton = ({onClick}) => (
  <Wrapper onClick={onClick}>
    <AddIcon/>
  </Wrapper>
);

FloatingButton.propTypes = {
  onClick: PropTypes.func
}

export default FloatingButton;