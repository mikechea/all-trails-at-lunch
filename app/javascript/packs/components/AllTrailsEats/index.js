import React, { useState, useEffect } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import axios from 'axios';

import CardList from '../CardList'
import MobileCard from '../card'

import { placesState, locationState } from '../atoms.js'

const RESTAURANT = 'restaurant'
const DEFAULT_COORDINATES = '37.791320,-122.406317'

// function CharacterCount() {
//   // grabs just the value
//   const count = useRecoilValue(charCountState);

//   return <>Character Count: {count}</>;
// }

// // selector is like computed from mobx
// const charCountState = selector({
//   key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//   get: ({get}) => {
//     const text = get(textState);

//     return text.length;
//   },
// });

// // sets the state of atoms
// const textState = atom({
//   key: 'textState', // unique ID (with respect to other atoms/selectors)
//   default: '', // default value (aka initial value)
// });

// function CharacterCounter() {
//   return (
//     <div>
//       <TextInput />
//       <CharacterCount />
//     </div>
//   );
// }

// function TextInput() {
//   const [text, setText] = useRecoilState(textState);

//   const onChange = (event) => {
//     setText(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" value={text} onChange={onChange} />
//       <br />
//       Echo: {text}
//     </div>
//   );
// }

// function getLocation() {
//   if (navigator.geolocation) {
//     const location = navigator.geolocation.getCurrentPosition();
//     const {  }
//     const coordinateString = `${location},${location}`
//   }else{
//     return '37.791320,-122.406317'
//   }
// }

function Location() {
  return(
    <p>
      {useRecoilValue(locationState)}
    </p>
  )
}


function AllTrailsEats() {
  const [places, setPlaces] = useRecoilState(placesState)
  
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: DEFAULT_COORDINATES,
          radius: 1500,
          type: RESTAURANT,
          key: 'AIzaSyDpEr8NpgU_ERTJw6tm1nmGrpUZozM-oQE',
          fields: 'name,price_level,rating,user_ratings_total,geometry,photos'
        }
      })

      const data = response.data.results.map((place => {
        return atom({key: place.id, default: place})
       }))
       
      setPlaces(data)
    }

    fetchData();
  }, []); // Or [] if effect doesn't need props or state


  return (
    <CardList>
      {
        places.map((place) => (
          <MobileCard id={place.key} key={place.key}/>
        ))
      }
    </CardList>
  );
}

export default AllTrailsEats;
