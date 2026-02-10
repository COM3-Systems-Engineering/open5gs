import PropTypes from 'prop-types';

import { media, shadows } from 'helpers/style-utils';
import styled from 'styled-components';

import ClearIcon from 'react-icons/lib/md/clear';
import SearchIcon from 'react-icons/lib/md/search';

const Padding = styled.div`
  padding: 0 1rem;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  
  margin: 1rem auto;
  max-width: 700px;
  background: ${props => props.theme.surfaceContainer};
  color: ${props => props.theme.text};
  box-shadow: ${shadows.sm}
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      
  &:hover {
    box-shadow: ${shadows.md}
  }

  ${media.tablet`
    width: 500px;
  `}

  ${media.mobile`
    margin: 1rem auto ;
    width: 100%;
  `}

  border-radius: 10px;
  border: 1px solid ${props => props.theme.outline};
`;

const SearchIconWrapper = styled.div`
  display: inline-flex;
  margin-left: 1rem;
  font-size: 1.5rem;
`

const Input = styled.input`
  padding : 0.8rem;

  width: 100%;

  font-size: 1rem;

  cursor: text;

  border: none;
  outline: none;
  background: transparent;
`
const ClearIconWrapper = styled.div`
  display: inline-flex;
  margin-right: 1rem;
  font-size: 1.5rem;

  cursor: pointer;
`

const Search = ({ value, onChange, onClear }) => (
  <Padding>

  <Wrapper>
    <SearchIconWrapper><SearchIcon/></SearchIconWrapper>
    <Input 
      value={value}
      onChange={onChange}/>
    {value !== '' && 
      <ClearIconWrapper onClick={onClear}>
        <ClearIcon/>
      </ClearIconWrapper>
    }
  </Wrapper>
    </Padding>

)

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func
};

export default Search;