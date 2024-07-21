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
    const [nameError, setNameError] = useState(false)
    const {tournaments, setTournaments} = useOutletContext()

    function handleNameChange(e){
        setName(e.target.value)

        if (e.target.value.length < 10){
            setNameError(true)
        }
        else{
            setNameError(false)
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
            <Typography textAlign={'center'} variant='h6'>Edit Tournament</Typography>
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
                            fullWidth
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
                            error={nameError}
                            helperText={nameError ? 'Name must greater than 10 characters': ''}
                            onChange={(e) => handleNameChange(e)}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            required
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

export default AddTournamentForm