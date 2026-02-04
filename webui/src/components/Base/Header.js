import PropTypes from 'prop-types';

import styled from 'styled-components';

import { CircleIcon, Tooltip } from 'components';
import MoonIcon from 'react-icons/lib/md/brightness-3';
import SunIcon from 'react-icons/lib/md/brightness-5';
import MenuIcon from 'react-icons/lib/md/menu';
import PersonIcon from 'react-icons/lib/md/person';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;

  color: white;
  background: ${p => p.theme.surfaceContainer};
  border-bottom: 1px solid ${p => p.theme.surfaceContainerHighest};
`;

const Menu = styled.div`
  display: inline-flex;
  margin: 0 1.5rem;

  cursor: pointer;
  font-size: 1.5rem;

  color: ${p => p.theme.onSurface};
`;

const Title = styled.div`
  margin: 0 0.5rem;
  flex: 1;
  color: ${p => p.theme.onSurface};

  font-size: 1.2rem;
  font-family: 'Ubuntu', sans-serif;
`;

const Thumbnail = styled.div`
  padding: 1rem 0;
  margin-right: 2rem;

  cursor: pointer;
`;

const ToggleBtn = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  color: ${p => p.theme.onSurface};
`;

const propTypes = {
  onSidebarToggle: PropTypes.func.isRequired,
  onLogoutRequest: PropTypes.func.isRequired,
  onToggleTheme: PropTypes.func,
  currentTheme: PropTypes.string
}

const Header = ({ onSidebarToggle, onLogoutRequest, onToggleTheme, currentTheme }) => (
  <Wrapper>
    <Menu onClick={onSidebarToggle}>
      <MenuIcon/>
    </Menu>
    <Title>
      COM3 Open5GS
    </Title>
    <ToggleBtn onClick={onToggleTheme}>
       {currentTheme === 'light' ? <MoonIcon/> : <SunIcon/>}
    </ToggleBtn>
    <div style={{ width: '1rem' }} />
    <Thumbnail onClick={onLogoutRequest}>
      <Tooltip bottom content='Logout' width="60px">
        <CircleIcon size="2rem" background={p => p.theme.tertiary}> {/* Keep static color for avatar or use theme.tertiary */}
          <PersonIcon />
        </CircleIcon>
      </Tooltip>
    </Thumbnail>
  </Wrapper>
)

Header.propTypes = propTypes;

export default Header;
