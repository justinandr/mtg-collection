import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import CardCard from '../components/CardCard'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RegistrationCard from '../components/RegistrationCard'

function PlayerDetail() {

    const params = useParams()
    const [player, setPlayer] = useState({})
    const {registrations, setRegistrations} = useOutletContext()

    useEffect(() => {
        fetch(`/players/${params.id}`)
        .then(res => res.json())
        .then(data => setPlayer(data))
    }, [params.id])

    const player_cards = player.ownerships ? player.ownerships.map(card => card.cards) : []
    const player_registrations = registrations ? registrations.filter(reg => reg.player_id === player.id): []

    function handleDeleteReg(id){
        fetch(`/registrations/${id}`, {
            method: 'DELETE'
        })
        .then(() => setRegistrations(registrations => registrations.filter((filterReg) => filterReg.id !== id)))
    }
    return (
        <>
            <NavBar />
            <Typography gutterBottom variant='h2'>{player.name}</Typography>
            <Typography variant='h5' color='text.secondary'>Tournaments played: {player.tournaments_played}</Typography>
            <Accordion sx={{mt: '25px'}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                    <Typography variant='h6'>Registrations</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{width: '100%'}}>
                        {registrations ? <Grid2 container rowSpacing={5} columnSpacing={5}>
                            {player_registrations.map(registration => {
                                return (
                                    <Grid2 key={registration.id} xs={16}>
                                        <RegistrationCard 
                                            key={registration.id}
                                            regId={registration.id}
                                            tournament={registration.tournaments}
                                            handleDelete={handleDeleteReg}
                                        />
                                    </Grid2>
                                )
                            })}
                        </Grid2> : <Typography variant='body1'>Loading...</Typography>}
                    </Box>
                </AccordionDetails>
            </Accordion>
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
                        {player ? <Grid2 container rowSpacing={5} columnSpacing={5}>
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