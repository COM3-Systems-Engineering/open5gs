import { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import { shadows } from 'helpers/style-utils';

const Wrapper = styled.div`
  position: relative;
  margin-right: 1rem;
`;

const Trigger = styled.button`
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 10px;
  border: 1px solid ${p => p.theme.outline || '#e5e7eb'};
  background: ${p => p.theme.surface || '#fff'};
  color: ${p => p.theme.onSurface};
  box-shadow: ${shadows.sm};
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 80px;
  border-radius: 12px;
  background: ${p => p.theme.surface || '#fff'};
  border: 1px solid ${p => p.theme.outline || '#e5e7eb'};
  box-shadow: ${shadows.xl};
  padding: 0.25rem;
  z-index: 1000;
  animation: ${fadeIn} 0.15s ease-out;
`;

const Item = styled.div`
  padding: 0.5rem 0.6rem;
  font-size: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${p => p.theme.surface};
  color: ${p => p.theme.onSurface};
  border: 1px solid ${p => p.active ? p.theme.outline : 'transparent'};

  &:hover {
    background: ${p => p.theme.surfaceContainerHigh};
  }
`;

const FlagIcon = styled.img`
  width: 20px;
  height: 15px;
  margin-left: 8px;
  vertical-align: middle;
  border-radius: 2px;
`;

const languages = [
  { code: 'en', label: 'EN', icon: 'us' },
  { code: 'pt', label: 'PT', icon: 'br' },
  { code: 'es', label: 'ES', icon: 'es' },
];

class LanguageSwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLang: 'en',
      open: false,
    };

    this.wrapperRef = null;

    this.loadLanguage = this.loadLanguage.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  componentDidMount() {
    this.loadLanguage();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ open: false });
    }
  }

  toggleDropdown() {
    this.setState({ open: !this.state.open });
  }

  loadLanguage() {
    var cookies = document.cookie.split(';');
    var lang = 'en';

    for (var i = 0; i < cookies.length; i++) {
      var c = cookies[i].trim();
      if (c.indexOf('googtrans=') === 0) {
        var val = c.substring('googtrans='.length);
        var parts = val.split('/');
        if (parts.length > 0) {
          lang = parts[parts.length - 1];
        }
      }
    }

    this.setState({ currentLang: lang });
  }

  changeLanguage(langCode) {
    var domain =
      window.location.hostname === 'localhost'
        ? ''
        : 'domain=.' + window.location.hostname + ';';

    document.cookie =
      'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ' +
      domain;

    if (langCode !== 'en') {
      document.cookie = 'googtrans=/auto/' + langCode + '; path=/; ' + domain;
      document.cookie = 'googtrans=/auto/' + langCode + '; path=/;';
    } else {
      document.cookie = 'googtrans=/auto/en; path=/; ' + domain;
    }

    window.location.reload();
  }

  render() {
    var currentLang = this.state.currentLang;
    var open = this.state.open;

    var activeLang = languages.find(function (l) {
      return l.code === currentLang;
    });

    return (
      <Wrapper ref={ref => (this.wrapperRef = ref)}>
        <Trigger onClick={this.toggleDropdown}>
          {(activeLang && activeLang.label) || 'EN'} ▾
        </Trigger>

        {open && (
          <Dropdown>
            {languages.map(lang => (
              <Item
                key={lang.code}
                active={currentLang === lang.code}
                onClick={() => this.changeLanguage(lang.code)}
              >
                <span>{lang.label}</span>
                <FlagIcon src={'../../../static/flag-' + lang.icon + '.png'} alt={lang.code} />
              </Item>
            ))}
          </Dropdown>
        )}
      </Wrapper>
    );
  }
}

export default LanguageSwitcher;
