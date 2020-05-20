import React, { Fragment, useState, useEffect } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { Map, GoogleApiWrapper, Marker, InfoWindow, InfoMarker } from 'google-maps-react';
import darkPin from './darkPin.png'
import stars from '../stars'

import {
  Card,
  CardInfo,
  RestaurantName,
  Text } from '../card'

import { 
  placesState,
  locationState,
  selectedCardState,
  filterState,
  searchTermState,
  itemWithID
} from '../atoms.js'

function MapContainer(props) {
  const { places } = props
  if(places.length === 0) { return <h1>LOADING!</h1> }
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedCardState)
  const [markerInfo, setMarkerInfo] = useState(null)

  function updateSelection(props, marker, e, place) {
    debugger
    setSelectedPlace(place.id)
    setMarkerInfo(marker)
  }

  const markers = places.map((place) => (
                      <Marker
                        key={place.id}
                        name={place.name}
                        position={place.geometry.location}
                        onClick={(props, marker, e, place) => updateSelection(props, marker, e, place)}
                        icon={{
                          url: darkPin,
                          anchor: new google.maps.Point(16,16),
                          scaledSize: new google.maps.Size(40,40)
                        }} />
                    )
                  )

  const selectedMarker = markers.find((marker) => { return marker.key === selectedPlace.id })

  return (
    <Map
      google={props.google}
      zoom={14}
      initialCenter={{
        lat: 37.791320,
        lng: -122.406317
      }}
    >
      {markers}
      {selectedMarker && <InfoWindow
        style={{height: '102px', padding: '10px', display: 'flex', flexDirection: 'row'}}
        position={{
          lat: selectedMarker.props.position.lat,
          lng: selectedMarker.props.position.lng 
        }}
        visible={true}>
          {/* <img style={{width: '64px', height: '64px'}} src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${photos[0].photo_reference}&maxwidth=64&maxheight=64&key=AIzaSyDpEr8NpgU_ERTJw6tm1nmGrpUZozM-oQE`}></img> */}
          <CardInfo>
            <RestaurantName>{selectedPlace.name}</RestaurantName>
            <Text><img src={stars[Math.round(selectedPlace.rating)]} style={{height: '15px'}} /> ({selectedPlace.user_ratings_total})</Text>
            <Text>$ • Supporting Text</Text>
          </CardInfo>
      </InfoWindow>}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDpEr8NpgU_ERTJw6tm1nmGrpUZozM-oQE'
})(MapContainer)