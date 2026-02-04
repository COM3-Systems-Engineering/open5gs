import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Modal } from 'components';
import { media, shadows, transitions } from 'helpers/style-utils';


const Wrapper = styled.div`
  width: 300px;
  background: ${p => p.theme.surfaceContainerHighest};
  border-radius: 12px;
  border: 1px solid ${p => p.theme.outline};
  box-shadow: ${shadows.xl};
  overflow: hidden;
  
  ${media.mobile`
    width: calc(100vw - 2rem);
  `}
`;

const TitleWrapper = styled.div`
  padding-left: 1rem;
  line-height: 3rem;
  border-radius: 12px 12px 0 0;

  font-size: 1.2rem;

  color: ${p => p.theme.onError};
  background-color: ${p => p.theme.error};
`;

const ContentWrapper = styled.div`
  padding: 1rem 0 0 1rem;
  height: 5rem;

  font-size: 1rem;
  color: ${p => p.theme.onSurface};

  background-color: ${p => p.theme.surfaceContainerLowest};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  background-color: ${p => p.theme.surface};
`;

const Button = styled.button`
  margin: 0.5rem;
  padding: 0.3rem;
  width: 4rem;

  text-align: center;
  font-size: 0.9rem;

  border-radius: 10px;
  outline: none;
  cursor: pointer;

  transition: all .3s;
`;

const YesButton = Button.extend`
  border: 1px solid ${p => p.theme.error};
  color: ${p => p.theme.onError};
  background: ${p => p.theme.error};
  &:hover {
    background: ${p => p.theme.onErrorContainer}
  }
  &:active {
    background: ${p => p.theme.errorContainer}
  }
`;

const NoButton = Button.extend`
  width: 5rem;
  border: 1px solid ${p => p.theme.outline};
  color: ${p => p.theme.onSurface};
  background: ${p => p.theme.surface};
  &:hover {
    background: ${p => p.theme.surfaceContainerHigh}
  }
  &:active {
    background: ${p => p.theme.surfaceContainerHigh}
  }
`;

const propTypes = {
  visible: PropTypes.bool, 
  onHide: PropTypes.func, 
  onLogout: PropTypes.func,
};

const Logout = ({ visible, onHide, onLogout }) => (
  <Modal 
    visible={visible} 
    onOutside={onHide} 
    transitionEnter={`${transitions.fadeInUp} 180ms cubic-bezier(0.16, 1, 0.3, 1)`}
    transitionLeave={`${transitions.fadeOutDown} 180ms cubic-bezier(0.16, 1, 0.3, 1)`}
    transitionEnterTimeout={180}
    transitionLeaveTimeout={180}>
    <Wrapper>
      <TitleWrapper>
        Sair
      </TitleWrapper>
      <ContentWrapper>
        Tem certeza que deseja sair?
      </ContentWrapper>
      <ButtonWrapper>
        <NoButton 
          onClick={onHide}>
          Cancelar
        </NoButton>
         <YesButton
          onClick={onLogout}>
          Sair
        </YesButton>
      </ButtonWrapper>
    </Wrapper>
  </Modal>
)

Logout.propTypes = propTypes;

export default Logout;
