import PropTypes from 'prop-types';

import { media, shadows } from 'helpers/style-utils';
import styled from 'styled-components';

import ProfileIcon from 'react-icons/lib/md/content-copy';
import SubscriberIcon from 'react-icons/lib/md/person-add';
import AccountIcon from 'react-icons/lib/md/vpn-key';


const Menu = styled.div`
  display: block;
  width: ${p => p.visible ? p.width : '0' };
  transition: width 180ms cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  position: relative;
  z-index: 1;
  

  ${media.mobile`
    position: absolute;
    top: 4rem;
    left: 0;
    width: ${p => p.visible ? '100%' : '0'};
    height: ${p => p.visible ? '100%' : '0'};
    transition: height 180ms cubic-bezier(0.4, 0, 0.2, 1);
  `}

  background-color: ${p => p.theme.surfaceContainer};
  border-right: 1px solid ${p => p.theme.surfaceContainerHighest};
  padding: ${p => p.visible ? '0.5rem' : '0'};
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  padding : 0.5rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;

  transition: all 180ms cubic-bezier(0.4, 0, 0.2, 1);

  cursor: pointer;
  color: ${p => p.active ? p.theme.onPrimary : p.theme.onSurface};
  background: ${p => p.active ? p.theme.primary : p.theme.surfaceContainer};

  &:hover {
    background: ${p => p.active ? p.theme.primaryVariant : p.theme.surfaceContainerHigh};
  }

  box-shadow: ${p => p.active ? shadows.sm : 'none'};
`;

const Icon = styled.div`
  display: inline-flex;
  padding-left: 1rem;
  font-size: 1.2rem;
`;

const Title = styled.div`
  padding-left: 1rem;
  font-size: 0.8rem;
`;

const Item = ({ children, selected, name, onSelect }) => (
  <StyledItem
    onClick={() => onSelect(name)}
    active={name===selected}>
    {children}
  </StyledItem>
)

const propTypes = {
  isOpen: PropTypes.bool,
  width: PropTypes.string,
  selectedView: PropTypes.string,
  onSelectView: PropTypes.func
}

const defaultProps = {
  width: "16rem",
}

const Sidebar = ({ isOpen, width, selectedView, onSelectView }) => (
  <Menu visible={isOpen} width={width}>
    <Item name="subscriber" selected={selectedView} onSelect={onSelectView}>
      <Icon><SubscriberIcon/></Icon>
      <Title>Subscriber</Title>
    </Item>
    <Item name="profile" selected={selectedView} onSelect={onSelectView}>
      <Icon><ProfileIcon/></Icon>
      <Title>Profile</Title>
    </Item>
    <Item name="account" selected={selectedView} onSelect={onSelectView}>
      <Icon><AccountIcon/></Icon>
      <Title>Account</Title>
    </Item>
  </Menu>
)

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
