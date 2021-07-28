import React from 'react'

export default function Pagination({ goToNextPage, goToPrevPage }) {
  return (
    <div style={{ marginTop: '30px' }}>
      <button style={{ marginRight: '10px' }} onClick={goToPrevPage}>
        Prev
      </button>
      <button onClick={goToNextPage}>Next</button>
    </div>
  )
}
