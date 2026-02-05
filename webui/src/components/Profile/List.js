import PropTypes from 'prop-types';

import { media, shadows } from 'helpers/style-utils';
import styled from 'styled-components';

import Item from './Item';

const Wrapper = styled.div`
  display: block;
  margin: 2rem;
  border: 1px solid ${p => p.theme.outline};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${shadows.sm};
  
  ${media.mobile`
    margin: 0.5rem 0.25rem;
  `}
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex:1;
  line-height: 2.5rem;
  padding : 0.25rem 2.5rem;
  border-bottom: 1px solid ${p => p.theme.outline};

  .title {
    font-size: 1rem;
    color: ${p => p.theme.onSurfaceVariant};
    width: 320px;
  }
  .ambr {
    font-size: 1rem;
    color: ${p => p.theme.onSurfaceVariant};
    width: 240px;
  }
`;

const propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.object),
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

const List = ({ profiles, deletedId, onView, onEdit, onDelete }) => {
  const profileList = profiles
    .map(profile =>
      <Item 
        key={profile._id}
        profile={profile}
        disabled={deletedId === profile._id}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete} />
    );

  return (
    <Wrapper>
    <Header key={"header"}>
        <div className="title">Title</div>
        <div className="ambr">Uplink/Downlink</div>
    </Header>
    {profileList}
    </Wrapper>
  )
}

List.propTypes = propTypes;

export default List;
