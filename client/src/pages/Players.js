import React from 'react'
import { useOutletContext } from 'react-router-dom'
import PlayerCard from '../components/PlayerCard'
import NavBar from '../components/NavBar'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Box } from '@mui/material'

// Display all players with options to search / maybe filter

function Players() {

    const {players} = useOutletContext()

    return (
        <div>
            <NavBar />
            <Box sx={{width: '100%'}}>
                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 3, sm: 2, md: 3 }}>
                    {players.map(player => {
                        return (
                            <Grid2 key={player.id} xs={4}>
                                <PlayerCard 
                                    key = {player.id} 
                                    player = {player} 
                                />
                            </Grid2>
                        )
                    })}
                </Grid2>
            </Box>
        </div>
    )
}

export default Players