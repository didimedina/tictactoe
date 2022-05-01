// @ts-nocheck

import React from 'react'
import * as RadioDropdown from '../RadioDropdown'
import { violet, slate, amber, purple, blackA } from '@radix-ui/colors';
import { styled } from '@stitches/react'
import { Circle, X,  Eraser, Queue, MoonStars } from 'phosphor-react'

/* OPEN TODOs

[x] Refactor history to be in dropdown
[x] Layout board and primary components
[x] Bug: claculateStatus stopped working the seconf I added icons instead of strings.
as a result game isn't resolving. This bug is happening because react components are being
injected into the Array of values instead of strings. a way to solve this is to only 
create the component at the point of injection and keep the entire app on stings along the way. Line 129
[] Improvement: if game hasn't started yet set heading to Let's play! and disable eraser.
[] Add animations using framer motion
[] Persist data through Convex

*/

// UTILS -----------------------------------

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

/* 

This logic on line 41 causes all the utils to break because they expect a string to be returned not a React object...
? <X name="X" size={40} color={amber.amber10}/> : <Circle name="O" size={40} color={purple.purple9}/>

*/

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

// TIC TAC TOE ------------------------------

const StyledGame = styled("div", {
  display: "grid",
  gridTemplateColumns: "auto",
  gridTemplateRows: "repeat(3, auto)",
  maxWidth: "460px",
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  justifyContent: 'center',
  gap: "20px",
  flexGrow: "1"
})

const StyledBoard = styled("div", {
  width: "100%",
  aspectRatio: "1 / 1",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  gap: 1,
  boxShadow: `0px 0px 20px 0px ${slate.slate4}`,
  borderRadius: "20px",
  overflow: "hidden",
  backgroundColor: slate.slate4
})

const StyledTile = styled({
  backgroundColor: "White",
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
})

const StyledStatus = styled("p", {
  fontSize: "40px",
  margin: "unset",
  width: "100%"
})

const StyledButton = styled("button", {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: "6px",
  height: 40,
  aspectRatio: "1 /1",
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: slate.slate8,
  backgroundColor: slate.slate4,
  '&:hover': { backgroundColor: slate.slate5 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
})

const StyledFooter = styled("div", {
  display: "grid",
  width: "100%",
  gridTemplateColumns: "auto auto 1fr",
  justifyItems: "end",
  gap: "10px"
})


function Board({squares, onClick}) {

  function renderSquare(i) {

    return (
      <StyledTile onClick={() => onClick(i)}>
        {squares[i] === null ? null : squares[i] === 'X' ? <X name="X" size={40} color={amber.amber10}/> : <Circle name="O" size={40} color={purple.purple9}/> } 
      </StyledTile>
    )
  }

  return (
    <StyledBoard>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
    </StyledBoard>
  )
}

export default function Game() {
  const [history, setHistory] = React.useState([
    Array(9).fill(null),
  ])
  const [currentStep, setCurrentStep] = React.useState(0)
  
  const currentSquares = history[currentStep]
  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)
  
  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return
    }
    
    const newHistory = history.slice(0, currentStep + 1)
    const squares = [...currentSquares]

    
    squares[square] = nextValue
    setHistory([...newHistory, squares])
    setCurrentStep(newHistory.length)
  }
  
  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }
  
  const dropdownMoves = history.map((stepSquares, step) => {
    const desc = step ? `Go to move #${step}` : 'Go to game start'
    const isCurrentStep = step === currentStep
    return (
      <RadioDropdown.Item disabled={isCurrentStep}  key={step} value={step}> {desc}
        <RadioDropdown.ItemIndicator>
          <div style={{ width: 6, height: 6, backgroundColor: violet.violet9, borderRadius: 9999}}/>
        </RadioDropdown.ItemIndicator>
      </RadioDropdown.Item>
    )
  })
  
  
  return (
    <StyledGame>
        <StyledStatus>{status}</StyledStatus>
        <Board onClick={selectSquare} squares={currentSquares} />
      <StyledFooter>
        <StyledButton onClick={restart}>
          <Eraser size={20} />
        </StyledButton>
        <RadioDropdown.Root>
          <RadioDropdown.Trigger asChild>
            <StyledButton>
              <Queue size={20}/>
            </StyledButton>
          </RadioDropdown.Trigger>
          <RadioDropdown.Content side={"top"} sideOffset={8}>
            <RadioDropdown.Group value={currentStep} onValueChange={setCurrentStep}>
              {dropdownMoves}
            </RadioDropdown.Group>
          </RadioDropdown.Content>
        </RadioDropdown.Root>
        <StyledButton>
          <MoonStars size={20}/>
        </StyledButton>
      </StyledFooter>
    </StyledGame>
  )
}





  