import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { DateCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useOutletContext } from 'react-router-dom'

function AddTournamentForm() {

    const [name, setName] = useState('')
    const [date, setDate] = useState(dayjs())
    const [location, setLocation] = useState('')
    const [locationError, setLocationError] = useState(false)
    const {tournaments, setTournaments} = useOutletContext()

    function handleLocationChange(e){
        setLocation(e.target.value)

        if (e.target.value.length < 10){
            setLocationError(true)
        }
        else{
            setLocationError(false)
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        const formData = {
            name: name, 
            year: date.$y,
            month: date.$M,
            day: date.$D,
            location: location
        }

        fetch('/tournaments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => setTournaments([...tournaments, data]))

        setName('')
        setDate(dayjs())
        setLocation('')
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
            }}
        >
            <Typography textAlign={'center'} variant='h6'>Add Tournament</Typography>
            <Box
                noValidate
                component='form'
                onSubmit={handleSubmit}
                sx={{mt: '10px', alignItems: 'center', display: 'flex', flexDirection: 'column'}}
            >
                <Grid2 container spacing={2}>
                    <Grid2 xs={12}>
                        <DateCalendar 
                            required
                            label='Date'
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            required
                            fullWidth
                            label='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            required
                            fullWidth
                            label='Location'
                            value={location}
                            error={locationError}
                            helperText={locationError ? 'Location must be greater than 10 characters': ''}
                            onChange={handleLocationChange}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <Button fullWidth disabled={locationError} type='submit' variant='contained' sx={{mb: '5px'}}>Submit</Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    )
}

export default AddTournamentForm