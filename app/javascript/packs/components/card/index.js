import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { BsHeart } from "react-icons/bs";

const Card = styled.div`
  display: flex;
  flex-direction: row;
  border-style: solid;
  border-width: 1px;
  border-color: #D8D8D8;
  border-radius: 8px;
  max-width: 327px;
  max-height: 96px;
  height: 96px;
  padding: 15px;
  background-color: white;
  align-items: center;
  margin-bottom: 8px;
`;


const CardInfo = styled.div`
  display: block;
  font-weight: bold;
`;

const RestaurantName = styled.p`
  font-size: 16px;
  color: #A6A6A6;
  margin: 0;
  padding: 4px;
`
const Text = styled.p`
  font-size: 12px;
  color: #A6A6A6;
  margin: 0;
  padding: 4px;
`

function MobileCard(props) {
  return (
    <Card key={props.key}>
        <img style={{width: '64px', height: '64px'}} src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAFu4rzwT3OYumvVGQko_ww1YvHGmXMl0AxmxP_hET3FBEYYTCfevBpeh0jmBP57E1PDziRrnoygY0uW2VCw5fos9_u5xl5zFwKYczhKXFfRDipiwwiv3zImvNC1B3KG2DEhAB7oCVfmrLGG3VgzuYaY-wGhSeN4wuPIs9fx-A2vQGwF4Iyl3ILg&key=AIzaSyDpEr8NpgU_ERTJw6tm1nmGrpUZozM-oQE
  &maxwidth=64&maxheight=64`}></img>
        <CardInfo>
          <RestaurantName>RestaurantName</RestaurantName>
          <Text>(135)</Text>
          <Text>$ • Supporting Text</Text>
        </CardInfo>
        <BsHeart size={25} color={'grey'} style={{ marginLeft: 'auto', marginBottom: 'auto'}}/>
    </Card>
  )
}

export default MobileCard