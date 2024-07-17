import React, { useState } from 'react'
import { Box, TextField, Select, Button, MenuItem, Typography, InputLabel, FormControl } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Form } from 'react-router-dom'

function CardSearchForm() {

    const [name, setName] = useState('')
    const [rarity, setRarity] = useState('')
    const [type, setType] = useState('')
    const [rarityOpen, setRarityOpen] = useState(false)
    const [typeOpen, setTypeOpen] = useState(false)
    const types = ["Artifact", "Battle", "Conspiracy" ,"Creature" ,"Dragon" ,
        "Elemental", "Enchantment", "Goblin", "Hero", "instant", "Instant", 
        "Jaguar", "Kindred", "Knights", "Land", "Legend", "Phenomenon", "Plane", 
        "Planeswalker", "Scheme", "Sorcery", "Stickers", "Summon", "Tribal", 
        "Universewalker", "Vanguard", "Wolf"]
    const rarities = ['Common', 'Uncommon', 'Rare', 'Mythic']

    function handleRarityClose(){
        setRarityOpen(false)
    }

    function handleRarityOpen(){
        setRarityOpen(true)
    }

    function handleTypeClose(){
        setTypeOpen(false)
    }

    function handleTypeOpen(){
        setTypeOpen(true)
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
            <Typography variant='h4'>Card Search</Typography>
            <Box
            component='form'
            sx={{mt: '20px'}}
            >
                <Grid2 container spacing={2}>
                    <Grid2 xs={12} sm={6}>
                        <TextField
                        sx={{mt: '25px'}}
                        fullWidth
                        label='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 xs={12} sm={6}>
                        <InputLabel id='rarity'>Rarity</InputLabel>
                        <Select
                            labelId='rarity'
                            fullWidth
                            label='Rarity'
                            open={rarityOpen}
                            onClose={handleRarityClose}
                            onOpen={handleRarityOpen}
                            value={rarity}
                            onChange={(e) => setRarity(e.target.value)}
                        >
                            {rarities.map(rarity => {
                                return(
                                    <MenuItem key={rarity} value={rarity}>{rarity}</MenuItem>
                                )
                            })}
                        </Select>
                    </Grid2>
                    <Grid2 xs={12}>
                        <InputLabel id='type'>Type</InputLabel>
                        <Select
                            fullWidth
                            labelId='type'
                            label='Type'
                            open={typeOpen}
                            onClose={handleTypeClose}
                            onOpen={handleTypeOpen}
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            {types.map(type => {
                                return(
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                )
                            })}
                        </Select>
                    <Grid2 xs={12} sx={{mt: '25px'}}>
                        <Button fullWidth variant='contained'>Submit</Button>
                    </Grid2>
                    </Grid2>
                </Grid2>
            </Box>
        </Box> 
    )
}

export default CardSearchForm