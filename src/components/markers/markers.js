import React from 'react';
import styled from 'styled-components';

import AddField from '../add-field';
import ListWithMarkers from '../list-with-markers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-width: 300px;
`;

const Markers = () => {
  return(
    <Wrapper>
      <AddField />
      <ListWithMarkers />
    </Wrapper>
  );
};

export default Markers;