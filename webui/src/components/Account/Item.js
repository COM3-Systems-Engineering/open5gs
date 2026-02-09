import PropTypes from 'prop-types';
import { Component } from 'react';

import oc from 'open-color';
import styled from 'styled-components';

import DeleteIcon from 'react-icons/lib/md/delete';

import { Spinner, Tooltip } from 'components';

const Card = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  border-top: 1px solid ${p => p.theme.outline};
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 2rem;
  width: 100%;

  cursor: pointer;

  ${p => p.disabled && 'opacity: 0.5; cursor: not-allowed; pointer-events: none;'};

  &:hover {
    background: ${p => p.theme.surfaceContainerHigh};
  }
`;

const CircleButton = styled.div`
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px;

  color: ${oc.gray[6]};

  border-radius: 1rem;
  font-size: 1.5rem;

  &:hover {
    color: ${oc.indigo[6]};
  }

  &.delete {
    &:hover {
      color: ${oc.pink[6]};
    }
  }
`

const Username = styled.div`
    font-size: 1rem;
    color: ${p => p.theme.onSurfaceVariant};
`;

const Role = styled.div`
    font-size: 1rem;
    color: ${p => p.theme.onSurfaceVariant};
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 4rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const propTypes = {
  account: PropTypes.shape({
    username: PropTypes.string
  }),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

class Item extends Component {
  static propTypes = {
    account: PropTypes.shape({
      username: PropTypes.string
    }),
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
  }

  handleEdit = e => {
    e.stopPropagation();

    const {
      account,
      onEdit,
    } = this.props;

    const {
      username
    } = account;

    onEdit(username)
  }

  handleDelete = e => {
    e.stopPropagation();

    const {
      account,
      onDelete
    } = this.props;

    const {
      username
    } = account;

    onDelete(username)
  }

  render() {
    const {
      handleEdit,
      handleDelete
    } = this;
    
    const {
      session,
      disabled,
      spinner,
      account,
      onEdit,
      onDelete
    } = this.props;

    return (
    <Card disabled={disabled} onClick={handleEdit}>
  <Username>{account.username}</Username>

  <Role>{account.roles[0]}</Role>

  {session.user.username !== account.username ? (
    <Tooltip content="Delete" width="60px">
      <CircleButton
        className="delete"
        onClick={handleDelete}
        style={{ justifySelf: 'end' }}
      >
        <DeleteIcon />
      </CircleButton>
    </Tooltip>
  ) : (
    <div style={{ width: '34px', height: '32px', justifySelf: 'end' }}></div>
  )}

  {spinner && (
    <SpinnerWrapper>
      <Spinner sm />
    </SpinnerWrapper>
  )}
</Card>
    )
  }
}

export default Item;
