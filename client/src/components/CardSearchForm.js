import React, { useState } from 'react'
import { Box, TextField, Select, Button, MenuItem, Typography, InputLabel, FormControl } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Form } from 'react-router-dom'

function CardSearchForm() {

    const [rarity, setRarity] = useState('')

    const items = ['1', '2', '3', '4', '5', '6']

    function handleChange(e){
        setRarity(e.target.value)
    }

    return (

        <Box sx={{minWidth: 120, m: 'auto'}}>
            <FormControl fullWidth>
                <TextField id='card-name' label='Card Name'></TextField>
            </FormControl>
            {/* <Grid2 container >
                <Grid2 xs={12}>
                    <Typography variant='h2' textAlign={'center'} gutterBottom>Card Search</Typography>
                </Grid2>
                <Grid2 xs={4}>
                    <TextField label='Card Name'/>
                </Grid2>
                <Grid2 xs={4}>
                    <Select
                        id='rarity'
                        value={rarity}
                        label="Rarity"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Rarity 1</MenuItem>
                    </Select>
                </Grid2>
                <Grid2 xs={4}>
                    <Button>Button</Button>
                </Grid2>
            </Grid2> */}
        </Box>
    )
}

export default CardSearchForm