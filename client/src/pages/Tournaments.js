import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { useOutletContext } from 'react-router-dom'
import TournamentCard from '../components/TournamentCard'
import { Box, Button, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import TournamentEditForm from '../components/TournamentEditForm'

function Tournaments() {

    const { tournaments, setTournaments, players } = useOutletContext()
    const [showAddTournamentForm, setShowAddTournamentForm] = useState(false)

    function handleDeleteTournament(id){
        fetch(`/tournaments/${id}`, {
            method: 'DELETE'
        })
        .then(() => setTournaments(tournaments => tournaments.filter(filterTourn => filterTourn.id !== id)))
    }

    function handleAddTournament(event){
        event.preventDefault()
    }

    return (
        <>
            <NavBar />
                <Typography variant='h2'>Tournaments</Typography>
                <Button variant='outlined' onClick={() => setShowAddTournamentForm(!showAddTournamentForm)}>Add Tournament</Button>
                {showAddTournamentForm ?
                     <TournamentEditForm />
                     : null}
                <Box sx={{width: '100%', mt: '10px'}}>
                    <Grid2 container rowSpacing={1} columnSpacing={{ xs: 3, sm: 2, md: 3 }}>
                        {tournaments.map(tournament => {
                            return (
                                <Grid2 key={tournament.id} xs={4}>
                                    <TournamentCard 
                                        key = {tournament.id} 
                                        tournament = {tournament}
                                        handleDelete={handleDeleteTournament}
                                        players={players} 
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