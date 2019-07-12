import arrayMove from 'array-move';

const initialState = {
  markers: [
    {
      id: 1,
      name: 'marker - 1',
      geometry: { lat: 55.6847, lng: 37.7385},
    },
    {
      id: 2,
      name: 'marker - 2',
      geometry: { lat: 55.847, lng: 37.7388},
    },
    {
      id: 3,
      name: 'marker - 3',
      geometry: { lat: 55.447, lng: 37.3388 },
    },
  ],
  mapCenter: {
    lat: 55.75,
    lng: 37.57
  },
}

const reducer = (state = initialState, action) => {
  const { markers, mapCenter } = state;
  switch (action.type) {

    case 'ADD_MARKER' :
      const { name } = action.payload;
      const newMarker = {
        id: state.markers.length + 1,
        name: name,
        geometry: mapCenter,
      }
      return {
        ...state,
        markers: [
          ...state.markers,
          newMarker
        ]
      };

    case 'DELETE_MARKER' :
      const markerId = action.payload;
      const markerIdx = state.markers.findIndex((i) => i.id === markerId);
      return {
        ...state,
        markers: [
          ...markers.slice(0, markerIdx),
          ...markers.slice(markerIdx + 1),
        ]
      }

    case 'DRAG_LIST_ITEM' :
      const { oldIndex, newIndex } = action.payload;
      return {
        markers: arrayMove(state.markers, oldIndex, newIndex),
      }

    case 'DRAG_MARKER' :
      const { lat, lng, index } = action.payload;
      const newMarkerPosition = { ...markers[index], geometry: { lat, lng } };
      return {
        ...state,
        markers: [
          ...markers.slice(0, index),
          newMarkerPosition,
          ...markers.slice(index + 1)
        ]
      }

    case 'DRAG_MAP' :
      const coordinate = action.payload;
      return {
        ...state,
        mapCenter: { lat: coordinate.lat, lng: coordinate.lng}
      }

    default:
      return state;
  }
}

export default reducer;