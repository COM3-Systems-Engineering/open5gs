import { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const LangButton = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  margin: 0 0.2rem;
  font-weight: ${p => p.active ? 'bold' : 'normal'};
  color: ${p => p.active ? p.theme.primary : p.theme.onSurface};
  border-bottom: ${p => p.active ? `2px solid ${p.theme.primary}` : '2px solid transparent'};

  &:hover {
    color: ${p => p.theme.primary};
  }
`;

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'es', label: 'ES' },
];

class LanguageSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLang: 'en'
    };
  }

  componentDidMount() {
    this.loadLanguage();
  }

  loadLanguage = () => {
    // Basic cookie parsing to find Googtrans
    // Format is typically /source/target or /auto/target
    const cookies = document.cookie.split(';');
    let lang = 'en'; // Default
    
    for(let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf('googtrans=') == 0) {
            let val = c.substring('googtrans='.length, c.length);
            // val is like /en/es
            let parts = val.split('/');
            if (parts.length > 0) {
               lang = parts[parts.length - 1];
            }
        }
    }
    
    this.setState({ currentLang: lang });
  }

  changeLanguage = (langCode) => {
    // Set cookie and reload
    // Google Translate expects cookie "googtrans" with value "/source/target"
    // We can use "/auto/target" to let it auto-detect source
    
    const domain = window.location.hostname === 'localhost' ? '' : `domain=.${window.location.hostname};`;
    
    // Clear existing cookie just in case
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ${domain}`;
    
    if (langCode !== 'en') {
        document.cookie = `googtrans=/auto/${langCode}; path=/; ${domain}`;
        document.cookie = `googtrans=/auto/${langCode}; path=/;`; // Fallback for localhost
    } else {
        // For English, we effectively want "no translation" or translate to 'en'
         document.cookie = `googtrans=/auto/en; path=/; ${domain}`;
    }

    // Force reload
    window.location.reload();
  }

  render() {
    const { currentLang } = this.state;

    return (
      <Wrapper>
        {languages.map(lang => (
            <LangButton 
                key={lang.code} 
                active={currentLang === lang.code}
                onClick={() => this.changeLanguage(lang.code)}
            >
                {lang.label}
            </LangButton>
        ))}
      </Wrapper>
    );
  }
}

export default LanguageSwitcher;
