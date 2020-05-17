import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


export const placesState = atom({
  key: 'placeState', // unique ID (with respect to other atoms/selectors)
  default: [], 
})

export const locationState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '37.791320,-122.406317', // default value (aka initial value)
});