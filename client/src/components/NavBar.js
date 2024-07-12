import React from 'react'
import { AppBar, Box, Toolbar, Typography, IconButton, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function NavBar() {

    const navItems = ['Players', 'Cards', 'Tournaments']

    return (
        <Box sx={{ display: 'flex', backgroundColor: 'black' }}>
            <AppBar position='sticky' component="nav" >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    MTG Collections
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button component={Link} to='/' sx={{ color: '#fff' }}>
                            Home
                    </Button>
                    <Button component={Link} to='/players' sx={{ color: '#fff' }}>
                            Players
                    </Button>
                    <Button component={Link} to='/cards' sx={{ color: '#fff' }}>
                            Cards
                    </Button>
                    <Button component={Link} to='/tournaments' sx={{ color: '#fff' }}>
                            Tournaments
                    </Button>
                </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar