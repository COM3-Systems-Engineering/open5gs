import Head from 'next/head';
import PropTypes from 'prop-types';
import { Component } from 'react';

import { themes } from 'helpers/style-utils';
import styled, { ThemeProvider } from 'styled-components';

import Header from 'containers/Header';
import Sidebar from 'containers/Sidebar';

import Package from '../../../package';

const Body = styled.div`
  display: flex;
  height: calc(100vh - 4rem);
  background-color: ${props => props.theme.surface};
  color: ${props => props.theme.onBackground};
`

const getStoredTheme = () => {
  try {
    return localStorage.getItem('theme') || 'light';
  } catch (e) {
    return 'light';
  }
}

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light'
    };
  }

  componentDidMount() {
    const theme = getStoredTheme();
    this.setState({ theme });
    document.body.classList.add(`theme-${theme}`);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.body.classList.remove(`theme-${prevState.theme}`);
      document.body.classList.add(`theme-${this.state.theme}`);
    }
  }

  toggleTheme = () => {
    const nextTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({ theme: nextTheme });
    localStorage.setItem('theme', nextTheme);
  }

  render() {
    const { title, children } = this.props;
    const { theme } = this.state;
    const currentTheme = themes[theme];

    return (
      <ThemeProvider theme={currentTheme}>
        <div>
          <Head>
            <title>{title}</title>
          </Head>
          <Header onToggleTheme={this.toggleTheme} currentTheme={theme} />
          <Body>
            <Sidebar/>
            {children}
          </Body>
        </div>
      </ThemeProvider>
    );
  }
}

const propTypes = {
  title: PropTypes.string
}

const defaultProps = {
  title: `COM3 5GS ${Package.version}`
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

const ContainerWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

Layout.Container = ({visible, children}) => visible ? (
  <ContainerWrapper>
    {children}
  </ContainerWrapper>
) : null;

Layout.Content = styled.div`
`;

export default Layout;
