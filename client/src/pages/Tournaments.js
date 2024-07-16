import React from 'react'
import NavBar from '../components/NavBar'
import { useOutletContext } from 'react-router-dom'
import TournamentCard from '../components/TournamentCard'
import { Box, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'


// Display all tournaments in chronological order. Button leading to TournamentDetail / Registration

function Tournaments() {

    const { tournaments, setTournaments } = useOutletContext()

    return (
        <>
            <NavBar />
                <Typography variant='h2'>Tournaments</Typography>
                <Box sx={{width: '100%', mt: '10px'}}>
                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 3, sm: 2, md: 3 }}>
                        {tournaments.map(tournament => {
                            return (
                                <Grid2 key={tournament.id} xs={4}>
                                    <TournamentCard 
                                        key = {tournament.id} 
                                        tournament = {tournament} 
                                    />
                                </Grid2>
                            )
                        })}
                    </Grid2>
                </Box>
        </>
    )
}

export default Tournaments