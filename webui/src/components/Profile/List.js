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

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 2rem;
`;

const Title = styled.div`
    font-size: 1rem;
    opacity: 0.8;
    color: ${p => p.theme.onSurfaceVariant};
`;

const Ambr = styled.div`
    font-size: 1rem;
    opacity: 0.8;
    color: ${p => p.theme.onSurfaceVariant};
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
      <ScrollArea>
        <Header key={"header"}>
          <Title>Title</Title>
          <Ambr>Uplink/Downlink</Ambr>
          <Ambr style={{ width: '80px', justifySelf: 'end' }}></Ambr>
        </Header>
        {profileList}
      </ScrollArea>
    </Wrapper>
  )
}

List.propTypes = propTypes;

export default List;
