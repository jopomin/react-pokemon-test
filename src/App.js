import React, { useState, useEffect } from 'react'
import PokeList from './PokeList'
import Pagination from './Pagination'
import axios from 'axios'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currPageUrl, setCurrPageUrl] = useState([
    'https://pokeapi.co/api/v2/pokemon',
  ])
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios
      .get(currPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false)
        setPrevPageUrl(res.data.previous)
        setNextPageUrl(res.data.next)
        setPokemon(res.data.results.map((poke) => poke.name))
      })

    return () => cancel()
  }, [currPageUrl])

  function goToNextPage() {
    setCurrPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrPageUrl(prevPageUrl)
  }

  if (loading) return 'Loading...'

  return (
    <>
      <div style={{ margin: '100px' }}>
        <PokeList pokemon={pokemon} />
        <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} />
      </div>
    </>
  )
}

export default App
