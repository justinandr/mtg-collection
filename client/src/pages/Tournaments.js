import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { useOutletContext } from 'react-router-dom'
import TournamentCard from '../components/TournamentCard'
import { Box, Button, Grid, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import AddTournamentForm from '../components/AddTournamentForm'

function Tournaments() {

    const { tournaments, setTournaments, players } = useOutletContext()
    const [showAddTournamentForm, setShowAddTournamentForm] = useState(false)

    function handleDeleteTournament(id){
        fetch(`/tournaments/${id}`, {
            method: 'DELETE'
        })
        .then(() => setTournaments(tournaments => tournaments.filter(filterTourn => filterTourn.id !== id)))
    }

    return (
      <Box sx={{width: '100%', mt: '10px'}}>
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 3, sm: 2, md: 3 }} sx={{mr: 10, ml: 10}}>
          <Grid2 xs={12}>
            <Typography textAlign={'center'} variant='h2'>Tournaments</Typography>
          </Grid2>
          <Grid2 textAlign={'center'} xs={12} sx={{mb: 3}}>
            <Button variant='contained' xs={{textAlign: 'center'}} onClick={() => setShowAddTournamentForm(!showAddTournamentForm)}>Add Tournament</Button>
          </Grid2>
          {showAddTournamentForm ?
            <AddTournamentForm />
          : null}
            {tournaments.map(tournament => {
              return (
                <Grid2 key={tournament.id} xs={6}>
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
        
    )
}

export default Tournaments