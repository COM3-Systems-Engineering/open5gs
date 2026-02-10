import PropTypes from 'prop-types';

import { transitions } from 'helpers/style-utils';
import styled from 'styled-components';

import Item from './Item';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(350px, 100%), 1fr));
  gap: 1rem;  
  padding: 0 1rem;
  

  .subscriber-enter {
    animation: ${transitions.stretchOut} .3s ease-in;
    animation-fill-mode: forwards;
  }   
    
  .subscriber-leave { 
    animation: ${transitions.shrinkIn} .15s ease-in;
    animation-fill-mode: forwards;
  }   
`

const propTypes = {
  subscribers: PropTypes.arrayOf(PropTypes.object),
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  search: PropTypes.string
}

const List = ({ subscribers, deletedImsi, onView, onEdit, onDelete, search }) => {
  function pred(s){
    if ((s.msisdn && s.msisdn[0] && s.msisdn[0].indexOf(search) !== -1) || 
      (s.msisdn && s.msisdn[1] && s.msisdn[1].indexOf(search) !== -1) ||
      (s.imsi.indexOf(search) !== -1)){
      return true;
    }
  }
  const subscriberList = subscribers
    .filter(pred)
    .sort( 
      (a,b) => {
        if(a.imsi > b.imsi) return 1;
        if (a.imsi < b.imsi) return -1;
        return 0;
      }
    )
    .map(subscriber =>
      <Item 
        key={subscriber.imsi}
        subscriber={subscriber}
        disabled={deletedImsi === subscriber.imsi}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete} />
    );

  return (
    <Wrapper>

        {subscriberList}
    
    </Wrapper>
  )
}

List.propTypes = propTypes;

export default List;