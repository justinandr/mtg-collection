import React from 'react'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'

function TournamentCard({ tournament, handleDelete, regId }) {

    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography gutterBottom variant='h6'>{tournament.name}</Typography>
                <Typography variant='body1'>Date: {tournament.date}</Typography>
                <Typography variant='body1'>Location: {tournament.location}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => handleDelete(regId)}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default TournamentCard