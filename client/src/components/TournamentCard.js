import React from 'react'
import { Card, CardContent, Typography, CardActions, IconButton, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

function TournamentCard({ tournament, handleDelete, regId }) {

    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography gutterBottom variant='h6'>{tournament.name}</Typography>
                <Typography variant='body1'>Date: {tournament.date}</Typography>
                <Typography variant='body1'>Location: {tournament.location}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => handleDelete(tournament.id)} startIcon={<DeleteIcon />}>Delete</Button>
                <Button startIcon={<EditIcon />}>Edit</Button>
                <Button startIcon={<AppRegistrationIcon />}>Register</Button>
            </CardActions>
        </Card>
    )
}

export default TournamentCard