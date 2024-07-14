import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

function CardCard({card}) {
    return (
        <Card sx={{ maxWidth: 223 }}>
            <CardMedia
                component="img"
                alt={card.name}
                height="310"
                image={card.image_url}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {card.name}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardCard