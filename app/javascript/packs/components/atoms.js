import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import memoize from 'fast-memoize'

export const placesState = atom({
  key: 'placeState', // unique ID (with respect to other atoms/selectors)
  default: [], 
})

export const locationState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '37.791320,-122.406317', // default value (aka initial value)
});

export const selectedCardState = atom({
  key: 'selectedCardState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export const filterState = atom({
  key: 'filterState', // unique ID (with respect to other atoms/selectors)
  default: 'desc', // default value (aka initial value)
});

export const searchTermState = atom({
  key: 'searchTermState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

export const currentViewState = atom({
  key: 'currentViewState', // unique ID (with respect to other atoms/selectors)
  default: 'list', // default value (aka initial value)
})

export const itemWithID = 
  memoize(id => atom({
    key: id,
    default: {}
  }))
