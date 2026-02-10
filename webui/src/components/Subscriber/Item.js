import PropTypes from 'prop-types';
import { Component } from 'react';

import { media, shadows } from 'helpers/style-utils';
import styled from 'styled-components';

import DeleteIcon from 'react-icons/lib/md/delete';
import EditIcon from 'react-icons/lib/md/edit';

import { Spinner, Tooltip } from 'components';

const Sizer = styled.div`
  display: inline-block;
  width: 100%;

  ${p => p.disabled && 'opacity: 0.5; cursor: not-allowed;'};

  ${media.tablet`
    width: 100%;
  `}
`;

const Card = styled.div`
  position: relative;
  display: flex;

  background: ${props => props.theme.surfaceContainer};
  box-shadow: ${shadows.sm}

  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  cursor: pointer;

  ${p => p.disabled && 'pointer-events: none;'}

  .actions {
    position: absolute;
    top: 0;
    right: 0;
    width: 6rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    box-shadow: ${shadows.md};
  }

  border-radius: 10px;
  border: 1px solid ${props => props.theme.outline};
`;

const CircleButton = styled.div`
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px;

    color: ${p => p.theme.onSurfaceVariant};

  border-radius: 1rem;
  font-size: 1.2rem;

  &:hover {
    color: ${p => p.theme.primary};
  }

  &.delete {
    &:hover {
      color: ${p => p.theme.error};
    }
  }
`

const Imsi = styled.div`
  padding-left: 1rem;
  color: ${props => props.theme.onSurface};
  font-size: 14px;
  line-height : 3rem;
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
  subscriber: PropTypes.shape({
    imsi: PropTypes.string
  }),
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

class Item extends Component {
  static propTypes = {
    subscriber: PropTypes.shape({
      imsi: PropTypes.string
    }),
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
  }

  handleEdit = e => {
    e.stopPropagation();

    const {
      subscriber,
      onEdit,
    } = this.props;

    const {
      imsi
    } = subscriber;

    onEdit(imsi)
  }

  handleDelete = e => {
    e.stopPropagation();

    const {
      subscriber,
      onDelete
    } = this.props;

    const {
      imsi
    } = subscriber;

    onDelete(imsi)
  }

  render() {
    const {
      handleEdit,
      handleDelete
    } = this;
    
    const {
      disabled,
      subscriber,
      onView,
      onEdit,
      onDelete
    } = this.props;

    const {
      imsi
    } = subscriber;

    return (
      <Sizer disabled={disabled}>
        <Card disabled={disabled} onClick={() => onView(imsi)}>
          <Imsi>{imsi}</Imsi>
          <div className="actions">
            <Tooltip content='Edit' width="60px">
              <CircleButton onClick={handleEdit}><EditIcon/></CircleButton>
            </Tooltip>
            <Tooltip content='Delete' width="60px">
              <CircleButton className="delete" onClick={handleDelete}><DeleteIcon/></CircleButton>
            </Tooltip>
          </div>
          {disabled && <SpinnerWrapper><Spinner sm/></SpinnerWrapper>}
        </Card>
      </Sizer>
    )
  }
}

export default Item;
