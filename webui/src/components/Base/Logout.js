import PropTypes from 'prop-types';

import oc from 'open-color';
import styled from 'styled-components';

import { Modal } from 'components';
import { media, shadows, transitions } from 'helpers/style-utils';


const Wrapper = styled.div`
  width: 300px;
  background: white;
  border-radius: 12px;
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

  color: white;
  background-color: ${oc.red[7]};
`;

const ContentWrapper = styled.div`
  padding: 1rem 0 0 1rem;
  height: 5rem;

  font-size: 1rem;
  color: ${oc.gray[7]};

  background-color: ${oc.gray[1]};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  background-color: ${oc.gray[2]};
`;

const Button = styled.button`
  margin: 0.5rem;
  padding: 0.3rem;
  width: 4rem;

  text-align: center;
  font-size: 0.9rem;

  border-radius: 3px;
  outline: none;
  cursor: pointer;

  transition: all .3s;
`;

const YesButton = Button.extend`
  border: 1px solid ${oc.red[9]};
  color: white;
  background: ${oc.red[7]};
  &:hover {
    background: ${oc.red[5]}
  }
  &:active {
    background: ${oc.red[8]}
  }
`;

const NoButton = Button.extend`
  border: 1px solid ${oc.gray[5]};
  color: black;
  background: ${oc.gray[3]};
  &:hover {
    background: ${oc.gray[2]}
  }
  &:active {
    background: ${oc.gray[4]}
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
          Não
        </NoButton>
         <YesButton
          onClick={onLogout}>
          Sim
        </YesButton>
      </ButtonWrapper>
    </Wrapper>
  </Modal>
)

Logout.propTypes = propTypes;

export default Logout;
