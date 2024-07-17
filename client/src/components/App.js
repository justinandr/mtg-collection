import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'

function App() {

    const [players, setPlayers] = useState([])
    const [tournaments, setTournaments] = useState([])
    const [registrations, setRegistrations] = useState([])

    useEffect(() => {
        fetch('/players')
        .then(res => res.json())
        .then(data => setPlayers(data))
    }, [])

    useEffect(() => {
        fetch('/tournaments')
        .then(res => res.json())
        .then(data => setTournaments(data))
    }, [registrations])

    useEffect(() => {
        fetch('/registrations')
        .then(res => res.json())
        .then(data => setRegistrations(data))
    }, [tournaments])

  return (
    <>
        <Outlet context={{players, setPlayers, tournaments, setTournaments, registrations, setRegistrations}} />
    </>
  )
}

export default App;
