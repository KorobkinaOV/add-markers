import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { dragMarker, dragMap } from '../../actions';

const mapStyles = {
  width: '800px',
  height: '100%'
};

const Wrapped = styled.div`
  width: 800px;

  & div {
    width: 800px!important;
  }
`;

export class YandexMap extends React.Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.props.dragMarker({lat, lng, index});
  };

  getCenter(mapProps, map) {
    mapProps.componentProps.dragMap({ lat: map.center.lat(), lng: map.center.lng() })
  }

  render() {
    const { google, mapCenter, markers } = this.props;
    const { activeMarker, showingInfoWindow, selectedPlace } = this.state;
    return (
      <Wrapped>
        <Map
          google={google}
          zoom={10}
          style={mapStyles}
          initialCenter={mapCenter}
          onDragend={this.getCenter}
          componentProps={this.props}
        >

          {
            markers.map((item, index) => (
              <Marker
                position = {item.geometry}
                onClick={this.onMarkerClick}
                name={item.name}
                key={item.id}
                draggable={true}
                onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
              />
            ))
          }

          <Polyline
            path={markers.map((i) => i.geometry)}
            options={{
              'strokeColor':'#FE5F55',
              'strokeOpacity': 1,
              'strokeWeight': 3,
              'geodesic': true
            }}
          />

          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{selectedPlace.name}</h4>
            </div>
        </InfoWindow>
        </Map>
      </Wrapped>
    );
  }
}

const mapStateToProps = ({ markers, mapCenter }) => {
  return {
    markers,
    mapCenter
  };
}

const mapDispatchToProps = {
  dragMarker,
  dragMap
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: ('AIzaSyCGaOx9P1FwiZqidilxf_Ezo-p3n0vPQqQ')
  })(YandexMap));