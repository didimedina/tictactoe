import type { NextPage } from 'next'
import Game from '../components/tictactoe/TicTacToe'
import {styled} from '@stitches/react'
import {slate} from '@radix-ui/colors'

const StyledTicTacToe = styled("div", {
    width: "100vw",
    height: "100vh",
    backgroundColor: slate.slate2,
    display: "flex",
    // flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
})

export default function tictactoe() {
    return (
        <StyledTicTacToe>
            <Game/>
        </StyledTicTacToe>
    )
}