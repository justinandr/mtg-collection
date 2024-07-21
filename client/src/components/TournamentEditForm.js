import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { DateCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useOutletContext } from 'react-router-dom'


function TournamentEditForm({id}) {

    const [name, setName] = useState('')
    const [date, setDate] = useState(dayjs())
    const [location, setLocation] = useState('')
    const {tournaments, setTournaments} = useOutletContext()

    function handleSubmit(event){
        event.preventDefault()
        const formData = {
            name: name, 
            year: date.$y,
            month: date.$M,
            day: date.$D,
            location: location
        }

        fetch(`/tournaments/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => setTournaments(tournaments.map(tournament => {
            if(tournament.id !== id){
                return tournament
            }
            else {
                return data
            }
        })))
        
        setName('')
        setDate(dayjs())
        setLocation('')
    }

    return (
        <Box
            sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant='h6'>Edit Tournament</Typography>
            <Box
                noValidate
                component='form'
                sx={{mt: '10px'}}
                onSubmit={handleSubmit}
            >
                <Grid2 container spacing={2} >
                    <Grid2 xs={12} sm={12}>
                        <DateCalendar
                            label='Date'
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            fullWidth 
                            label='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            fullWidth
                            label='Location'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <Button fullWidth type='submit' variant='contained' sx={{mb: '15px'}}>Submit</Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    )
}

export default TournamentEditForm