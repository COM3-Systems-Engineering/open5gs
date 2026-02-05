import PropTypes from 'prop-types';
import { Component } from 'react';

import { transitions } from 'helpers/style-utils';
import onClickOutside from 'react-onclickoutside';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: ${p => p.zindex};

  .modal-enter {
    animation: ${p => p.transitionEnter};
    animation-fill-mode: forwards;
  }

  .modal-leave {
    animation: ${p => p.transitionLeave};
    animation-fill-mode: forwards;
  }

  border-radius: 1rem;
  border: 1px solid ${p => p.theme.outline};
  overflow: hidden;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  z-index: ${p => p.zindex - 1};

  opacity: ${p => (p.visible ? 1 : 0)};
  pointer-events: ${p => (p.visible ? 'auto' : 'none')};

  transition: opacity 180ms ease;
`;

class Modal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onOutside: PropTypes.func,
    zindex: PropTypes.string,
    transitionEnter: PropTypes.string,
    transitionLeave: PropTypes.string,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number
  }

  static defaultProps = {
    zindex: '500',
    transitionEnter: `${transitions.fadeInUp} 180ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionLeave: `${transitions.fadeOutDown} 180ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionEnterTimeout: 180,
    transitionLeaveTimeout: 180
  }

  handleClickOutside = (e) => {
    const { visible, onOutside } = this.props;

    if (!visible) return null;
    onOutside();
  }

  handleKeyUp = (e) => {
    const { onOutside } = this.props
    if (e.keyCode === 27) {
      onOutside();
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.visible !== this.props.visible) {
      if(this.props.visible) {
        document.body.addEventListener('keyup', this.handleKeyUp);
      } else { 
        document.body.removeEventListener('keyup', this.handleKeyUp);
      }
    }
  }
  
 render() {
  const { 
    visible, 
    children, 
    zindex,
    transitionEnter,
    transitionLeave,
    transitionEnterTimeout,
    transitionLeaveTimeout
  } = this.props;

  if (!visible) return null;

  return (
    <div>
      <Backdrop
        visible={visible}
        zindex={Number(zindex)}
        onClick={() => {
          this.props.onOutside();
        }}
      />
      <Wrapper 
        zindex={zindex}
        transitionEnter={transitionEnter} 
        transitionLeave={transitionLeave}>
        <CSSTransitionGroup
          transitionName="modal"
          transitionEnterTimeout={transitionEnterTimeout}
          transitionLeaveTimeout={transitionLeaveTimeout}>
          {
            visible && (<div>{children}</div>)
          }
        </CSSTransitionGroup>
      </Wrapper>
    </div>
  );
}
}

export default onClickOutside(Modal);
