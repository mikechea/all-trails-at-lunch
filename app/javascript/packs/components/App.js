import React, { useState, useEffect } from 'react';
import {
  RecoilRoot,
} from 'recoil';

import AllTrailsEats from './AllTrailsEats'

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


function App() {
  return (
    <RecoilRoot>
      <AllTrailsEats />
    </RecoilRoot>
  );
}

export default App;
