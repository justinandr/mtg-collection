import React from 'react'
import { useOutletContext } from 'react-router-dom'
import PlayerCard from '../components/PlayerCard'
import NavBar from '../components/NavBar'

// Display all players with options to search / maybe filter

function Players() {

    const {players} = useOutletContext()

    return (
        <div>
            <header>
                <NavBar />
            </header>
            {players.map(player => {
                return (
                    <PlayerCard 
                    key = {player.id} 
                    player = {player} 
                    />
                )
            })}
        </div>
    )
}

export default Players