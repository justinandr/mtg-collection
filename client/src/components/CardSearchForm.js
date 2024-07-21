import React, { useEffect, useState } from 'react'
import { Box, TextField, Select, MenuItem, Typography, InputLabel, Pagination } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import LoadingButton from '@mui/lab/LoadingButton'
import CardCard from '../components/CardCard'

function CardSearchForm() {

    const [name, setName] = useState('')
    const [rarity, setRarity] = useState('')
    const [rarityOpen, setRarityOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [cardsToDisplay, setCardsToDisplay] = useState([])
    const [page, setPage] = useState(0)
    const cardsPerPage = 24

    const rarities = ['Common', 'Uncommon', 'Rare', 'Mythic']

    function handleRarityClose(){
        setRarityOpen(false)
    }

    function handleRarityOpen(){
        setRarityOpen(true)
    }

    function handlePageChange(event, value){
        setPage(value)
    }

    function handleSubmit(event){
        event.preventDefault()
        setLoading(true)

        if (name === '' && rarity === ''){
            return null
        }

        const formData = {
            name: name,
            rarity: rarity,
        }

        fetch('/cards/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => setSearchResults(data))

        setName('')
        setRarity('')
        setPage(0)
    }

    useEffect(() => {
        setLoading(false)
        return (Array.isArray(searchResults) ? 
            setCardsToDisplay(searchResults.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage))
            : null)
    }, [page, searchResults])


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
            sx={{mt: '20px', alignItems: 'center', display: 'flex', flexDirection: 'column'}}
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
                    <Grid2 xs={12} sx={{mt: '15px'}}>
                        <LoadingButton loading={loading} type='submit' fullWidth variant='contained'>Submit</LoadingButton>
                    </Grid2>
                </Grid2>
            </Box>
        </Box> 
            <Box sx={{width: '100%', mt: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid2 container rowSpacing={4} sx={{alignItems: 'center'}} >
                    {Array.isArray(searchResults) ? cardsToDisplay.map(card => {
                        return (
                            <Grid2 key={card.id} xs={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <CardCard key={card.id} card={card} />
                            </Grid2>
                        )
                    }) : <Typography variant='h6'>No Matches Found...</Typography>}
                </Grid2>
                {searchResults.length > 24 ? 
                    <Pagination 
                    count={parseInt(searchResults.length / cardsPerPage)}
                    variant='outlined'
                    page={page}
                    onChange={handlePageChange}
                    sx={{mt: '25px'}}
                /> : null}
            </Box>
        </>
    )
}

export default CardSearchForm