import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

import { deleteMarker, dragListItem } from '../../actions';
import DelecteIcon from '../../images/close.svg';

const StyledLi = styled.li`
  border: 1px solid #a9a9aa;
  padding: 5px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
`;

const Delete = styled.img`
  width: 10px;
  margin-right: 10px;
  cursor: pointer;
  z-index: 1000;
  display: block;
  position: relative;
`;

const Wrapped = styled.div`
  & ul {
    padding: 0;
    margin: 0;
  }
`;

const ListWithMarkesr = ({ markers, dragListItem, deleteMarker }) => {

  const SortableItem = SortableElement(({value}) => {
    return(
      <StyledLi>
        {value.name}
        <Delete
          src={DelecteIcon}
          onClick={() => deleteMarker(value.id)}
            />
      </StyledLi>
    );
  });

  const SortableList = SortableContainer(({items}) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value.id}`}
            index={index}
            value={value}
            />
        ))}
      </ul>
    );
  });

  return (
    <Wrapped>
      <SortableList
        items={markers}
        onSortEnd={dragListItem}
        distance={1}
      />
    </Wrapped>
  );
};

const mapStateToProps = ({ markers }) => {
  return { markers }
};

const mapDispatchToProps = {
  deleteMarker,
  dragListItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWithMarkesr);