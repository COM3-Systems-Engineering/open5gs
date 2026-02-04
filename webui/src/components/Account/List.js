import PropTypes from 'prop-types';

import { media } from 'helpers/style-utils';
import styled from 'styled-components';

import Item from './Item';

const Wrapper = styled.div`
  display: block;
  margin: 2rem;
  border: 1px solid ${p => p.theme.outline};
  border-radius: 10px;
  overflow: hidden;
  
  ${media.mobile`
    margin: 0.5rem 0.25rem;
  `}
`

const Account = styled.div`
  display: flex;
  flex-direction: row;
  flex:1;
  line-height: 2.5rem;
  padding : 0.25rem 2.5rem;
  border-bottom: 1px solid ${p => p.theme.outline};

  .username {
    font-size: 1rem;
    color: ${p => p.theme.onSurfaceVariant};
    width: 320px;
  }
  .role {
    font-size: 1rem;
    color: ${p => p.theme.onSurfaceVariant};
    width: 240px;
  }
`;

const propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

const List = ({ accounts, deletedId, onEdit, onDelete, session }) => {
  const {
    username,
    roles
  } = session.user;

  const accountList = accounts
    .map(account =>
      <Item 
        key={account.username}
        session={session}
        account={account}
        disabled={deletedId === account.username || (roles.indexOf('admin') === -1 && account.username !== username)}
        spinner={deletedId === account.username}
        onEdit={onEdit}
        onDelete={onDelete} />
    );

  return (
    <Wrapper>
      <Account>
        <div className='username'>Usuário</div>
        <div className='role'>Perfil</div>
      </Account>
      {accountList}
    </Wrapper>
  )
}

List.propTypes = propTypes;

export default List;
