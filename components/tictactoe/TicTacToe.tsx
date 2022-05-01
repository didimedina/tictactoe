// @ts-nocheck

import React from 'react'
import * as RadioDropdown from '../RadioDropdown'
import { violet } from '@radix-ui/colors';

/* OPEN TODOs

[x] Refactor history to be in dropdown
[] Layout board and primary components
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

function Board({squares, onClick}) {
  function renderSquare(i: number) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
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
    <div>
      <div>
        <Board onClick={selectSquare} squares={currentSquares} />
        <button onClick={restart}>
          restart
        </button>
      </div>
      <div>
        <div>{status}</div>
        <RadioDropdown.Root>
          <RadioDropdown.Trigger>History</RadioDropdown.Trigger>
          <RadioDropdown.Content>
            <RadioDropdown.Group value={currentStep} onValueChange={setCurrentStep}>
              {dropdownMoves}
            </RadioDropdown.Group>
          </RadioDropdown.Content>
        </RadioDropdown.Root>
      </div>
    </div>
  )
}





  