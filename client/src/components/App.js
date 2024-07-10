import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'

function App() {

    const [players, setPlayers] = useState([])
    const [tournaments, setTournaments] = useState([])

    useEffect(() => {
        fetch('/players')
        .then(res => res.json())
        .then(data => setPlayers(data))
    }, [])

    useEffect(() => {
        fetch('/tournaments')
        .then(res => res.json())
        .then(data => setTournaments(data))
    }, [])

    console.log(players)
    console.log(tournaments)

  return (
    <>
        <Outlet context={{players, setPlayers, tournaments, setTournaments}} />
    </>
  )
}

export default App;
