import React from 'react'
import NavBar from '../components/NavBar'
import CardSearchForm from '../components/CardSearchForm'

// Display a search filter form to return cards based on that criteria

function Cards() {
  return (
    <>
        <NavBar />
        <CardSearchForm />
    </>
  )
}

export default Cards