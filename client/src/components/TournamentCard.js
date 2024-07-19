import React, { useState } from 'react'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import TournamentEditForm from './TournamentEditForm';
import RegistrationForm from './RegistrationForm';

function TournamentCard({ tournament, handleDelete, players }) {

    const [showEditForm, setShowEditForm] = useState(false)
    const [showRegisterForm, setShowRegisterForm] = useState(false)

    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography gutterBottom variant='h6'>{tournament.name}</Typography>
                <Typography variant='body1'>Date: {tournament.date}</Typography>
                <Typography variant='body1'>Location: {tournament.location}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => handleDelete(tournament.id)} startIcon={<DeleteIcon />}>Delete</Button>
                <Button startIcon={<EditIcon />} onClick={() => setShowEditForm(!showEditForm)}>Edit</Button>
                <Button startIcon={<AppRegistrationIcon />} onClick={() => setShowRegisterForm(!showRegisterForm)}>Register</Button>
            </CardActions>
            {showEditForm ? <TournamentEditForm id={tournament.id} /> : null}
            {showRegisterForm ? <RegistrationForm players={players} tournament={tournament} /> : null}
        </Card>
    )
}

export default TournamentCard