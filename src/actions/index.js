
const addMarker = (newMarker) => {
 return {
   type: 'ADD_MARKER',
   payload: newMarker,
 }
}

const deleteMarker = (markerId) => {
  return {
    type: 'DELETE_MARKER',
    payload: markerId,
  }
}

const dragListItem = ({oldIndex, newIndex}) => {
  return {
    type: 'DRAG_LIST_ITEM',
    payload: { oldIndex, newIndex },
  }
}

const dragMarker = ({lat, lng, index}) => {
  return {
    type: 'DRAG_MARKER',
    payload: {lat, lng, index}
  }
}

const dragMap = ({ lat, lng }) => {
  return {
    type: 'DRAG_MAP',
    payload: { lat, lng }
  }
}

export {
  addMarker,
  deleteMarker,
  dragListItem,
  dragMarker,
  dragMap
}