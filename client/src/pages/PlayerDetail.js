import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import CardCard from '../components/CardCard'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Typography } from '@mui/material'

function PlayerDetail() {

    const {players, tournaments} = useOutletContext()
    const params = useParams()
    const [player, setPlayer] = useState({})

    useEffect(() => {
        fetch(`/players/${params.id}`)
        .then(res => res.json())
        .then(data => setPlayer(data))
    }, [])

    const player_cards = player.ownerships.map(card => card.cards)

    console.log(player.ownerships)

    return (
        <>
            <NavBar />
            <Typography variant='h2'>{player.name}</Typography>
            <p>{player.tournaments_played}</p>
            <Box sx={{width: '100%'}}>
                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 3, sm: 2, md: 3 }}>
                    {player_cards.map(card => {
                        return (
                            <Grid2 key={card.id} xs={4}>
                                <CardCard
                                    key = {card.id} 
                                    card = {card} 
                                />
                            </Grid2>
                        )
                    })}
                </Grid2>
            </Box>
        </>
    )
}

export default PlayerDetail