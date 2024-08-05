import React from 'react'
import { Card, CardActions, CardContent, Button, Typography, Box, CardActionArea } from '@mui/material'
import { Link } from 'react-router-dom'

function PlayerCard({player, registrations}) {

    return (
        <Box sx={{minWidth: 275}}>
            <Card variant='outlined'>
                <CardActionArea component={Link} to={`/players/${player.id}`}>
                    <CardContent>
                        <Typography variant='h4' >{player.name}</Typography>
                        <Typography variant='h6'>Tournaments Played: {player.tournaments_played}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default PlayerCard