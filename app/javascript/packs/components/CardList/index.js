import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { BsHeart } from "react-icons/bs";

const List = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 351px;
  background-color: #f2f2f2;
  padding: 15px;
  overflow: scroll;
  height: 100vh;
`;

function CardList(props) {
  return (
    <List>
      {props.children}
    </List>
  )
}

export default CardList