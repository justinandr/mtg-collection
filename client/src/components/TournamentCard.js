import React from 'react'
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TournamentCard({ tournament, handleDelete, regId }) {

    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography gutterBottom variant='h6'>{tournament.name}</Typography>
                <Typography variant='body1'>Date: {tournament.date}</Typography>
                <Typography variant='body1'>Location: {tournament.location}</Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={() => handleDelete(tournament.id)}><DeleteIcon /></IconButton>
                <IconButton><EditIcon /></IconButton>
            </CardActions>
        </Card>
    )
}

export default TournamentCard