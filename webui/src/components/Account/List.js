import PropTypes from 'prop-types';

import { media, shadows } from 'helpers/style-utils';
import styled from 'styled-components';

import Item from './Item';

const Wrapper = styled.div`
  display: block;
  margin: 1rem;
  border: 1px solid ${p => p.theme.outline};
  border-radius: 10px;
  box-shadow: ${shadows.sm};
  min-width: 600px;
`

const ScrollArea = styled.div`
  overflow-y: auto;
  max-height: 600px;

  ${media.mobile`
    max-height: 400px;
  `}
`

const Account = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 2rem;
`;

const Username = styled.div`
    font-size: 1rem;
    opacity: 0.8;
    color: ${p => p.theme.onSurfaceVariant};
`;

const Role = styled.div`
    font-size: 1rem;
    opacity: 0.8;
    color: ${p => p.theme.onSurfaceVariant};
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
      <ScrollArea>
        <Account>
          <Username>User</Username>
          <Role>Role</Role>
          <Role style={{ width: '34px', justifySelf: 'end' }}></Role>
        </Account>
        {accountList}
      </ScrollArea>
    </Wrapper>
  )
}

List.propTypes = propTypes;

export default List;
