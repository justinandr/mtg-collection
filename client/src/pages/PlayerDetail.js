import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import CardCard from '../components/CardCard'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function PlayerDetail() {

    const params = useParams()
    const [player, setPlayer] = useState({})

    useEffect(() => {
        fetch(`/players/${params.id}`)
        .then(res => res.json())
        .then(data => setPlayer(data))
    }, [params.id])

    const player_cards = player.ownerships ? player.ownerships.map(card => card.cards) : []

    console.log(player.ownerships)

    return (
        <>
            <NavBar />
            <Typography variant='h2'>{player.name}</Typography>
            <Typography variant='h5'>Tournaments played: {player.tournaments_played}</Typography>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                    <Typography variant='h6'>Cards</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{width: '100%'}}>
                        {player ? <Grid2 container rowSpacing={10} columnSpacing={10}>
                            {player_cards.map(card => {
                                return (
                                    <Grid2 key={card.id} xs={3}>
                                        <CardCard
                                            key = {card.id} 
                                            card = {card} 
                                        />
                                    </Grid2>
                                )
                            })}
                        </Grid2> : <Typography variant='body1'>Loading...</Typography>}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default PlayerDetail