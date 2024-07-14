import React from 'react'
import { Card, CardActions, CardActionArea, CardContent, Button, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'

function PlayerCard({player}) {

    return (
        <Box sx={{minWidth: 275}}>
            <Card variant='outlined'>
                <CardActionArea>
                    <CardContent>
                        <Typography variant='h4' >{player.name}</Typography>
                        <Typography variant='h6'>Tournaments Played: {player.tournaments_played}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={`/players/${player.id}`} player={player} >View More</Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default PlayerCard