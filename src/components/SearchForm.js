import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchForm = ({ query, page, setPage, setQuery, fetchImages }) => {
  const handleSubmit = e => {
    e.preventDefault()

    if (!query) return
    if (page === 1) {
      fetchImages()
    }
    setPage(1)
  }

  return (
    <div className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='search...'
          className="form-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type='submit' className='form-btn'>
          <FaSearch />
        </button>
      </form>
    </div>
  )
}

export default SearchForm
