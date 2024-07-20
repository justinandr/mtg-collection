import { Box, Button, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

function RegistrationForm({players, tournament}) {

    const [playersOpen, setPlayersOpen] = useState(false)
    const [player, setPlayer] = useState('')
    const {registrations, setRegistrations} = useOutletContext()

    function handleSubmit(event){
        event.preventDefault()
        const data = {
            player_id: event.target[0].value,
            tournament_id: tournament.id
        }

        fetch('/registrations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => setRegistrations([...registrations, data]))
        setPlayer('')
    }

    function handlePlayersClose(){
        setPlayersOpen(false)
    }

    function handlePlayersOpen(){
        setPlayersOpen(true)
    }

    return (
        <Box
            sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
            }}
        >
            <Typography variant='h6'>Register a Player</Typography>
            <Box
                noValidate
                component='form'
                sx={{mt: '10px'}}
                onSubmit={handleSubmit}
            >
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} sm={12}>
                        <InputLabel id='players-select'>Players</InputLabel>
                        <Select
                            labelId='players-select'
                            id='players'
                            fullWidth
                            label='Players'
                            open={playersOpen}
                            onClose={handlePlayersClose}
                            onOpen={handlePlayersOpen}
                            value={player}
                            onChange={(e) => setPlayer(e.target.value)}
                        >
                            {players.map(player => {
                                return (
                                    <MenuItem 
                                        key={player.id} 
                                        value={player.id}
                                    >
                                        {player.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </Grid2>
                    <Grid2 xs={12}>
                        <Button fullWidth type='submit' variant='contained' sx={{mb: '5px'}}>Submit</Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    )
}

export default RegistrationForm