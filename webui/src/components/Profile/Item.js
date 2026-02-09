import PropTypes from 'prop-types';
import { Component } from 'react';

import oc from 'open-color';
import styled from 'styled-components';

import DeleteIcon from 'react-icons/lib/md/delete';
import EditIcon from 'react-icons/lib/md/edit';

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
  margin: 1px 4px;

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

const Title = styled.div`
    font-size: 1rem;
    color: ${p => p.theme.onSurfaceVariant};
`;

const Ambr = styled.div`
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
  profile: PropTypes.shape({
    title: PropTypes.string
  }),
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

class Item extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      title: PropTypes.string
    }),
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
  }

  handleEdit = e => {
    e.stopPropagation();

    const {
      profile,
      onEdit,
    } = this.props;

    const {
      _id
    } = profile;

    onEdit(_id)
  }

  handleDelete = e => {
    e.stopPropagation();

    const {
      profile,
      onDelete
    } = this.props;

    const {
      _id
    } = profile;

    onDelete(_id)
  }

  render() {
    const {
      handleEdit,
      handleDelete
    } = this;

    const {
      disabled,
      profile,
      onView,
      onEdit,
      onDelete
    } = this.props;

    const {
      _id,
      title,
      slice,
      ambr
    } = profile;

    return (
      <Card disabled={disabled} onClick={() => onView(_id)}>
        <Title>{title}</Title>
        <Ambr>
          {ambr['downlink'] === undefined ? "unlimited" :
            ambr.downlink['value'] === undefined ? "unlimited" :
              ambr.downlink.value
          } {ambr['downlink'] === undefined ? "unlimited" :
            ambr.downlink['unit'] === undefined ? "bps" :
              ambr.downlink.unit === 0 ? "bps" :
                ambr.downlink.unit === 1 ? "Kbps" :
                  ambr.downlink.unit === 2 ? "Mbps" :
                    ambr.downlink.unit === 3 ? "Gbps" :
                      ambr.downlink.unit === 4 ? "Tbps" :
                        "Unknown Unit"
          } / {ambr['uplink'] === undefined ? "unlimited" :
            ambr.uplink['value'] === undefined ? "unlimited" :
              ambr.uplink.value
          } {ambr['uplink'] === undefined ? "unlimited" :
            ambr.uplink['unit'] === undefined ? "bps" :
              ambr.uplink.unit === 0 ? "bps" :
                ambr.uplink.unit === 1 ? "Kbps" :
                  ambr.uplink.unit === 2 ? "Mbps" :
                    ambr.uplink.unit === 3 ? "Gbps" :
                      ambr.uplink.unit === 4 ? "Tbps" :
                        "Unknown Unit"}
        </Ambr>
        <div className="actions">
          <Tooltip content='Edit' width="60px">
            <CircleButton onClick={handleEdit}><EditIcon /></CircleButton>
          </Tooltip>
          <Tooltip content='Delete' width="60px">
            <CircleButton className="delete" onClick={handleDelete}><DeleteIcon /></CircleButton>
          </Tooltip>
        </div>
        {disabled && <SpinnerWrapper><Spinner sm /></SpinnerWrapper>}
      </Card>
    )
  }
}

export default Item;
