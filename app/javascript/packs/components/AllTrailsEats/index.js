import React, { Fragment, useState, useEffect } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import axios from 'axios';
import Media from 'react-media';
import styled, { css } from 'styled-components'

import CardList from '../CardList'
import MobileCard from '../card'
import Header from '../Header'
import { placesJSON } from './places_example.js'
import Map from '../Map'

import list from './list.png'
import pin from './pin.png'

import { 
  placesState,
  locationState,
  selectedCardState,
  searchTermState,
  currentViewState,
  itemWithID
} from '../atoms.js'

const RESTAURANT = 'restaurant'
const DEFAULT_COORDINATES = '37.791320,-122.406317'

const StaticButton = styled.div`
  position:fixed;
  right: 50%;
  bottom: 100%;
`

// const sortedPlaces = selector({
//   key: 'sortedPlace',
//   get: ({ get }) => {
//     const unsortedPlaces = get(placesState)
//     return unsortedPlaces.sort(compareRatingsAscending)
//   },
// });

function compareRatingsAscending(a, b) {
  const ratingA = a.rating
  const ratingB = b.rating

  return ratingA - ratingB
}

function compareRatingsDescending(a, b) {
  const ratingA = a.rating
  const ratingB = b.rating

  return ratingB - ratingA
}

const containerStyle = {
  position: 'relative',
  flex: 5,
  height: '100vh'
}

const StyleButton = styled.div`
  display: flex;
  font-family: inherit;
  position: absolute;
  z-index: 1000;
  right: 40%;
  top: 85%;
  width: 15%;
  padding: .5rem;
  background-color: #428A13;
  color: white;
  font-weight: 900;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
`

function AllTrailsEats() {
  const [places, setPlaces] = useRecoilState(placesState)
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedCardState)
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState)
  const [currentView, setCurrentView] = useState('list')

  useEffect(() => {
    // could be a selector
    async function fetchData() {
      const response = await axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          keyword: searchTerm,
          location: DEFAULT_COORDINATES,
          radius: 1500,
          type: RESTAURANT,
          key: 'AIzaSyDpEr8NpgU_ERTJw6tm1nmGrpUZozM-oQE',
          fields: 'name,price_level,rating,user_ratings_total,geometry,photos,price_level,opening_hours'
        }
      })
      // const response = placesJSON
      const data = response.data.results

      data.forEach((place => {
        itemWithID(place.id, place)
      }))

      setPlaces(data.sort(compareRatingsDescending))
      setSelectedPlace(data[0])
    }

    fetchData();
  }, [searchTerm]); // Or [] if effect doesn't need props or state

  const desktopView = (
    <Fragment>
      <CardList>
        {
          // use selector
          places.map((place) => (
            <MobileCard place={place} list={true}/>
          ))
        }
      </CardList>
      <div style={containerStyle}>
        <Map places={places}/>
      </div>
    </Fragment>
  )

  let mobileView

  if(currentView === 'list'){
    mobileView = (
      <Fragment>
        <CardList>
          {
            // use selector
            places.map((place) => (
              <MobileCard place={place} list={true}/>
            ))
          }
        </CardList>
        <StyleButton onClick={() => setCurrentView('map') }>
          <span><img src={pin}/></span> <p>Map</p>
        </StyleButton>
      </Fragment>
    )
  }else{
    mobileView = (
      <Fragment>
        <div style={containerStyle}>
          <Map places={places}/>
        </div>
        <StyleButton onClick={() => setCurrentView('list') }>
          <span><img src={list}/></span> <p>List</p>
        </StyleButton>
      </Fragment>
    )
  }
  
  debugger
  return (
    <Fragment>
      <Header />
      <div style={{display: 'flex', flexDirection: 'row', width: '100vw', position: 'relative' }}>
        <Media queries={{
            small: "(max-width: 599px)",
          }}>
          {matches => (
            <Fragment>
              {matches.small && mobileView}
              {!matches.small && desktopView}
            </Fragment>
          )}
        </Media>
      </div>
    </Fragment>
  );
}

export default AllTrailsEats;
