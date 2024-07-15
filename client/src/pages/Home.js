import React from 'react'
import NavBar from '../components/NavBar'
import { Box, Typography } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
// Something like a carousel

function Home() {

    const {players} = useOutletContext()
    const images = players.ownerships ? players[35].ownerships.map(c => c.cards.image_url) : []
    
    console.log(images)

    return (
        <>
            <NavBar />
            <Box maxWidth='100%' sx={{m: 'auto'}} >
                <Typography textAlign={'center'} variant='h2'>Welcome to MTG Collections</Typography>
            </Box>
        </>
    )
}

export default Home