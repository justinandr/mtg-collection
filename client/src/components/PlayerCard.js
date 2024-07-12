import React from 'react'
import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material'

function PlayerCard({player}) {

    return (
        <Box sx={{minWidth: 275}}>
            <Card variant='outlined'>
                <CardContent>
                    <Typography variant='h2' >{player.name}</Typography>
                    <Typography variant='h5'>Tournaments Played: {player.tournaments_played}</Typography>
                </CardContent>
                <CardActions>
                    <Button>View More</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default PlayerCard