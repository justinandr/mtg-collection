import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'

function PlayerDetail() {

    const params = useParams()
    const {players} = useOutletContext()
    const player = players.find(player => player.id == params.id)

    return (
        <>
            <NavBar />
        </>
    )
}

export default PlayerDetail