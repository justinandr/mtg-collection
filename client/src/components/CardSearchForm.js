import React, { useState } from 'react'
import { Box, TextField, Select, Button, MenuItem, Typography, InputLabel } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import CardCard from '../components/CardCard'

function CardSearchForm() {

    const [name, setName] = useState('')
    const [rarity, setRarity] = useState('')
    const [type, setType] = useState('')
    const [rarityOpen, setRarityOpen] = useState(false)
    const [typeOpen, setTypeOpen] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [showResults, setShowResults] = useState(false)

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

    function handleSubmit(event){
        event.preventDefault()
        const formData = {
            name: name,
            rarity: rarity,
            type: type
        }

        fetch('/cards/search', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => setSearchResults(data))
        setShowResults(true)
        console.log(searchResults)
    }

    console.log(showResults)

    return (
        <>
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
            noValidate
            component='form'
            sx={{mt: '20px'}}
            onSubmit={handleSubmit}
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
                    </Grid2>
                    <Grid2 xs={12} sx={{mt: '15px'}}>
                        <Button type='submit' fullWidth variant='contained'>Submit</Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Box> 
            <Box sx={{width: '100%', mt: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid2 container rowSpacing={4} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                    {searchResults ? searchResults.map(card => {
                        return (
                            <Grid2 key={card.id} xs={3}>
                                <CardCard key={card.id} card={card} />
                            </Grid2>
                        )
                    }) : null}
                </Grid2>
            </Box>
        </>
    )
}

export default CardSearchForm