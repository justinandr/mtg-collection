import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

function CardCard({card}) {
    return (
        <Card sx={{ maxWidth: 223, minHeight: 541 }}>
            <CardMedia
                component="img"
                alt={card.name}
                height={'310'}
                width={'223'}
                image={card.image_url}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                {card.name}
                </Typography>
                <Typography variant='body1' >Type: {card.type}</Typography>
                <Typography variant='body1' >Rarity: {card.rarity}</Typography>
                <Typography variant='body1' >Set: {card.set_name}</Typography>
                <Typography variant='body1' >Multiverse ID: {card.multiverse_id}</Typography>
            </CardContent>
        </Card>
    )
}

export default CardCard