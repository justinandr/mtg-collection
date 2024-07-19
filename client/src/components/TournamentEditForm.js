import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

function TournamentEditForm({id}) {

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')

    function handleSubmit(event){
        event.preventDefault()
        const formData = {
            name: name, 
            date: date,
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
        .then(data => console.log(data))
    }

    return (
        <Box
            sx={{
                marginTop: 8,
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
                <Grid2 container spacing={2}>
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
                            label='Date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)} 
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
                        <Button fullWidth type='submit' variant='contained' sx={{mb: '5px'}}>Submit</Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    )
}

export default TournamentEditForm