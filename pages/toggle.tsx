import {styled} from '@stitches/react'
import {slate, blackA, violet} from '@radix-ui/colors'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'phosphor-react' 
import { useState } from 'react'
import { useQuery, useMutation } from "../convex/_generated";
import { Id } from 'convex-dev/values'

/* 

Goals:
[] Make data persist with Convex
[] Switch theme from light to dark

*/

const Container = styled(motion.div, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: slate.slate3
})

const StyledPrimitiveToggle = styled(TogglePrimitive.Root, {
    all: 'unset',
    backgroundColor: 'white',
    color: slate.slate11,
    padding: 10,
    height: 48,
    width: 48,
    borderRadius: 8,
    display: 'flex',
    fontSize: 15,
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 10px ${blackA.blackA3}`,
    '&:hover': { backgroundColor: slate.slate1 },
    '&:focus': { boxShadow: `0 0 0 2px black` },
  });

  const StyledMotionToggle = styled(motion.div, {
      width: '100%',
      height: '100%',   
  })


export default function togglePage() {

    const darkMode = useQuery("getTheme")

    const setDarkMode = useMutation("setDarkTheme").withOptimisticUpdate((localStore, toggle) => {
        // localStore.getQuery("getTheme", toggle) <- why does this throw a warning?
        // because the getTheme() function doesn't have any arguments. 
        const existingToggle = localStore.getQuery("getTheme", [])
        if (existingToggle !== undefined) {
            // if existingToggle is undefined in localStore create a temperary one.
            const newTempToggle = toggle
        
            localStore.setQuery(
                "getTheme",
                [],
                newTempToggle // <- can only take 3 args but complains when in an array.
            )}

    })
    
    function changeTheme(e: boolean) {
        console.log(e)

        return setDarkMode(e)

    }


    return (
        <Container>
            <StyledPrimitiveToggle asChild onPressedChange={(e) => changeTheme(e)}>
                <StyledMotionToggle whileTap={{ scale: 0.9 }}>
                    {darkMode === true ? <Sun size={32} color={slate.slate9}/> : <Moon size={32} color={slate.slate9}/>}
                </StyledMotionToggle>
            </StyledPrimitiveToggle>
        </Container>
    )
}