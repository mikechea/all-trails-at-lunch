import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { BsHeart } from "react-icons/bs"
import logo from './logo.png'
import Popover from 'react-tiny-popover'
import Backdrop from '@material-ui/core/Backdrop'
import { MdRadioButtonUnchecked } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import { 
  filterState,
  searchTermState
} from '../atoms.js'

import {
  useRecoilState
} from 'recoil';

const StyledHeader = styled.div`
  display: flex;
  background-color: #FFFFFF;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  box-shadow: -3px 14px 18px -8px rgba(209,194,209,1);
`;

const StyledButton = styled.button`
  background-color: #FFFFFF;
  font-family: inherit;
  font-size: 1em;
  color: #808080;
  border-style: solid;
  border-width: 2px;
  border-color: #E6E6E6;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  margin-left: auto;
  outline:none;
  flex: 1;
  ${props => props.clicked && css`
    background-color: #428A13;
    border-width: 0px;
    color: #FFFFFF;
  `}
`;

const StyledInput = styled.input`
  background-color: #FFFFFF;
  font-family: inherit;
  font-size: 1em;
  color: #808080;
  border-style: solid;
  border-width: 2px;
  border-color: #E6E6E6;
  border-radius: 6px;
  padding: 10px 15px;
  margin-left: 16px;
  font-weight: 900;
  flex: 5;
  box-shadow: -3px 14px 18px -8px rgba(209,194,209,1);

`;

const StyledPopover = styled.div`
  display: block;
  width: 208px;
  height: 106px;
  background-color: #FFFFFF;
  font-family: inherit;
  font-size: 1em;
  color: #808080;
  border-style: solid;
  border-width: 2px;
  border-color: #E6E6E6;
  border-radius: 6px;
  padding: 10px 15px;
  margin-left: 16px;
  font-weight: 900;
  z-index: 1041;
  padding: 11px;
`;

const StyledCheckbox = styled.div`
  width: 208px;
  height: 106px;
  background-color: #FFFFFF;
  font-family: inherit;
  font-size: 1em;
  color: #808080;
  border-style: solid;
  border-width: 2px;
  border-color: #E6E6E6;
  border-radius: 6px;
  padding: 10px 15px;
  margin-left: 16px;
  font-weight: 900;
  z-index: 1041;
  padding: 11px;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  @media (max-width: 599px) {
    justify-content: center;
    padding-bottom: 1rem;
  }
`


function Header(props) {
  const [clicked, setClick] = useState(false)
  const [filter, setFilter] = useRecoilState(filterState)
  const [localFilter, setLocalFilter] = useState('desc')
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState)
  const [localSearchTerm, setlocalSearchTerm] = useState(searchTerm)
  
  const descending = localFilter === 'desc'

  function handleApplyClick() {
    setFilter(localFilter)
    setClick(false)
  }

  function handleSubmit(evt) {
    if(evt.key === 'Enter'){
      setSearchTerm(localSearchTerm)
    }
  }

  return (
    <StyledHeader filter={props.filter}>
      {/* {clicked && <Backdrop />} */}
      <StyledImageWrapper>
        <img src={logo} style={{height: '34px', width: '269px'}}/>
      </StyledImageWrapper>
      <div style={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
        <Popover
            isOpen={clicked}
            position={'bottom'} // preferred position
            content={(
                <StyledPopover>
                  <div onClick={() => setLocalFilter('desc')}>
                    {descending ? <FaCheckCircle color={'green'}/> : <MdRadioButtonUnchecked/>}
                    Ratings High To Low
                  </div>
                  <div onClick={() => setLocalFilter('asc')}>
                    {!descending ? <FaCheckCircle color={'green'}/> : <MdRadioButtonUnchecked/>}
                    Ratings Low To High
                  </div>
                  <div 
                    onClick={handleApplyClick}
                    style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', height: '100%', }}
                  >
                    Apply
                  </div>
                </StyledPopover>
            )}
        >
          <StyledButton onClick={() => setClick(true)} clicked={clicked}>{!clicked ? 'Filter' : 'Sort'}</StyledButton>
        </Popover>
        <StyledInput onKeyDown={handleSubmit} onChange={(evt) => setlocalSearchTerm(evt.target.value)} placeholder={'Search for a restaurant'}></StyledInput>
        </div>
    </StyledHeader>
  )
}

export default Header
