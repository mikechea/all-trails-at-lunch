import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { BsHeart } from "react-icons/bs";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { 
  placesState,
  locationState,
  selectedCardState,
  filterState,
  itemWithID
} from '../atoms.js'

const List = styled.div`
  display: flex;
  position: relative;
  background-color: #f2f2f2;
  padding: 23px;
  overflow: scroll;
  height: 100vh;
  flex-direction: column;
  flex: 2;

  ${props => useRecoilValue(filterState) === 'asc' && css`
    flex-direction: column-reverse;`
  }
`;
// const StyledImageWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// `

function CardList(props) {
  return (
    <List filter={props.filter}>
      {props.children}
    </List>
  )
}

export default CardList