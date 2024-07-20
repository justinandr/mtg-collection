import React from 'react'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

function Home() {

    return (
        <>
            <NavBar />
            <Box maxWidth='100%' sx={{mt: '150px'}} >
                <Typography textAlign={'center'} variant='h2' sx={{mt: '50px'}}>Welcome to MTG Collections</Typography>
                <Grid2 container spacing={2} sx={{mt: '50px', ml: '50px', mr: '50px'}}>
                    <Grid2 xs={4}>
                        <Card>
                            <CardActionArea component={Link} to='/players'>
                                <CardContent>
                                    <Typography gutterBottom textAlign={'center'} variant='h4'>Players</Typography>
                                    <Typography gutterBottom textAlign={'center'} variant='body1' color='text.secondary'>View all players, their cards and reigstrations.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid2>
                    <Grid2 xs={4}>
                        <Card>
                            <CardActionArea component={Link} to='/cards'>
                                <CardContent>
                                    <Typography gutterBottom textAlign={'center'} variant='h4'>Cards</Typography>
                                    <Typography gutterBottom textAlign={'center'} variant='body1' color='text.secondary'>Search for cards by name, rarity and more.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid2>
                    <Grid2 xs={4}>
                        <Card>
                            <CardActionArea component={Link} to='/tournaments'>
                                <CardContent>
                                    <Typography gutterBottom textAlign={'center'} variant='h4'>Tournaments</Typography>
                                    <Typography gutterBottom textAlign={'center'} variant='body1' color='text.secondary'>View a list of tournaments and their registrants.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    )
}

export default Home