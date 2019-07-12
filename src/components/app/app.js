import React from 'react';
import styled from 'styled-components';

import Markers from '../markers';
import YandexMap from '../map';

const Wrapped = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const App = () => {
  return (
    <Wrapped>
      <Markers />
      <YandexMap />
    </Wrapped>
  )
}

export default App;