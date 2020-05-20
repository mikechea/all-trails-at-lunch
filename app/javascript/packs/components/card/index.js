import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { BsHeart, BsHeartFill } from "react-icons/bs";

import stars from '../stars'
import moneySigns from '../moneySigns'

import {
  placesState,
  selectedCardState,
  itemWithID
} from '../atoms.js'

import { useLocalStorage } from '../helper'

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  border-style: solid;
  border-width: 1px;
  border-color: #D8D8D8;
  border-radius: 8px;
  padding: 15px;
  background-color: white;
  align-items: center;
  margin-bottom: 8px;
  height: 40vh;

  ${props => props.selected && css`
    border-color: green;
    border-width: 2px;
  `}
`;


export const CardInfo = styled.div`
  display: block;
`;

export const RestaurantName = styled.h1`
  font-size: 1rem;
  color: #A6A6A6;
  margin: 0;
  padding: 4px;
  font-weight: 900;
`
export const Text = styled.div`
  display: flex;
  font-size: .8rem;
  color: #A6A6A6;
  margin: 0;
  padding: 4px;
  align-items: center;
`

function MobileCard(props) {
  // let stars
  const [place, setPlace] = useState(props.place)

  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedCardState)
  const [previousSelectedPlace, setPreviousSelectedPlace] = useRecoilState(itemWithID(selectedPlace.id))
  
  function updateSelected () {
    setSelectedPlace(place)
  }

  const { name, user_ratings_total, photos, id, rating, price_level, opening_hours, vicinity } = place

  const selected = selectedPlace.id === place.id
  
  return (
    <Card 
      key={id}
      selected={selected}
      onClick={() => updateSelected()}>
        <img style={{width: '64px', height: '64px'}} src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${photos[0].photo_reference}&maxwidth=64&maxheight=64&key=AIzaSyDpEr8NpgU_ERTJw6tm1nmGrpUZozM-oQE`}></img>
        <CardInfo>
          <RestaurantName>{name}</RestaurantName>
          <Text><img src={stars[Math.round(rating)] } style={{height: '.8rem'}} /> ({user_ratings_total})</Text>
          <Text>{moneySigns[price_level]} • {vicinity}</Text>
        </CardInfo>
        {!favorites.includes(id) && <BsHeart onClick={saveFavorite} size={25} color={'grey'} style={{ marginLeft: 'auto', marginBottom: 'auto'}}/>}
        {favorites.includes(id) && <BsHeartFill onClick={removeFavorite} size={25} color={'green'} style={{ marginLeft: 'auto', marginBottom: 'auto'}}/>}
    </Card>
  )
}

export default MobileCard