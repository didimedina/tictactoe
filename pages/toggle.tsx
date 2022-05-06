import { styled, createStitches } from '@stitches/react'
import { slate, slateDark } from '@radix-ui/colors'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'phosphor-react' 
import { useQuery, useMutation } from "../convex/_generated";
import Image from 'next/image'
import { useState } from 'react'

// Create new theme object using stitches createTheme() which will serve as the default

const { theme, createTheme } = createStitches({
    theme:{
        colors: {
            ...slate,
        }
    }
})

// Create a second theme for darkTheme with a className of 'dark-theme' 

const darkTheme = createTheme('dark-theme', {
    colors: {
        ...slateDark,
    }
})

// Styled Components

const Container = styled(motion.div, {
    display: 'flex',
    position: "relative",
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.colors.slate3
})

const StyledPrimitiveToggle = styled(TogglePrimitive.Root, {
    all: 'unset',
    backgroundColor: theme.colors.slate12,
    padding: 10,
    height: 48,
    width: 48,
    borderRadius: 12,
    display: 'flex',
    fontSize: 15,
    lineHeight: 1,
    zIndex: "10",
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 10px ${theme.colors.slate5}`,
    '&:focus': { boxShadow: `0 0 0 2px black` },
});

const StyledMotionToggle = styled(motion.div, {
    width: '100%',
    height: '100%',   
})


// Toggle Page

export default function TogglePage() {

    // Question: do I need useState if the image thats being chosen is derived from darkMode boolean?
    // The main reason I added this is because Next complains it needs a default until the Promise resolves
    const [image, setImage] = useState('/1.jpg')

    const darkMode = useQuery("getTheme")

    const setDarkMode = useMutation("setDarkTheme").withOptimisticUpdate((localStore, toggle) => {
        // "getTheme" query has no arguements so getQuery() would take a second argument of an empty array.  
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


    async function getUnsplashBG() {
        const clientID = 'Ju57GlnA6AXJbnn5ZVInykoOJPj_IRBx8YT78qKJKBY'
        const nightBG = 'qVotvbsuM_c'
        const lightBG = 'GDumtPpJsT4'
        const currentBG = darkMode ? nightBG : lightBG

        const endpoint = new URL(`https://api.unsplash.com/photos/${currentBG}/?client_id=${clientID}`);

        const response = await fetch(endpoint.href)

        if (response.status === 404) {
            console.log("Don't got eeeeem :/")
            return;
        }

        const data = await response.json()
        const image = await data.urls.raw

        setImage(image)
    }


    getUnsplashBG()


    return (
        <Container className={darkMode ? darkTheme : ''}>
            <StyledPrimitiveToggle asChild onPressedChange={(e) => { setDarkMode(e); getUnsplashBG() }}>
                <StyledMotionToggle whileTap={{ scale: 0.9, rotate: 160 }} whileHover={{scale: 1.1}}>
                    {darkMode === true ? <Sun size={32} color={theme.colors.slate11.value}/> : <Moon size={32} color={theme.colors.slate2.value}/>}
                </StyledMotionToggle>
            </StyledPrimitiveToggle>
            <Image src={image} alt="" layout='fill'/>
        </Container>
    )
}