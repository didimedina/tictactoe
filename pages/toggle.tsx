import { styled, createStitches } from '@stitches/react'
import { slate, slateDark } from '@radix-ui/colors'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { motion } from 'framer-motion'
import { Moon, Sun, ThermometerSimple } from 'phosphor-react' 
import { useState } from 'react'
import { useQuery, useMutation } from "../convex/_generated";
import { Id } from 'convex-dev/values'

/* 

Goals:
[x] Make data persist with Convex
[] Switch theme from light to dark

*/
const { theme, createTheme } = createStitches({
    theme:{
        colors: {
            ...slate,
        }
    }
})

const darkTheme = createTheme('dark-theme', {
    colors: {
        ...slateDark,
    }
})

const Container = styled(motion.div, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.colors.slate3
})

const StyledPrimitiveToggle = styled(TogglePrimitive.Root, {
    all: 'unset',
    backgroundColor: 'white',
    padding: 10,
    height: 48,
    width: 48,
    borderRadius: 8,
    display: 'flex',
    fontSize: 15,
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 10px ${theme.colors.slate5}`,
    '&:hover': { backgroundColor: theme.colors.slate1},
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
                newTempToggle
            )}

    })
    

    // const theme = darkMode ? darkTheme : lightTheme

    return (
        <Container className={darkMode? darkTheme : ''}>
            <StyledPrimitiveToggle asChild onPressedChange={(e) => setDarkMode(e)}>
                <StyledMotionToggle whileTap={{ scale: 0.9, rotate: 160 }}>
                    {darkMode === true ? <Sun size={32} color={theme.colors.slate9.value}/> : <Moon size={32} color={theme.colors.slate9.value}/>}
                </StyledMotionToggle>
            </StyledPrimitiveToggle>
        </Container>
    )
}