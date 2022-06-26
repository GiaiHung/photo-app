import React, { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import UnsplashImage from './components/UnsplashImage'

// Example
// https://api.unsplash.com/photos/?client_id=HsoQn09fqyvd2xLUc0-3uKNN39yO8EgtN9Y3egh29L0&page=1
const clientId = `?client_id=${process.env.REACT_APP_ACCESSKEY}`
const mainURL = 'https://api.unsplash.com/photos/'
const searchURL = 'https://api.unsplash.com/search/photos/'

function App() {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [photos, setPhotos] = useState([])

  const fetchImages = async () => {
    setLoading(true)

    let URL
    const pageURL = `&page=${page}`
    const queryURL = `&query=${query}`

    if (!query) {
      URL = `${mainURL}${clientId}${pageURL}`
    } else {
      URL = `${searchURL}${clientId}${pageURL}${queryURL}`
    }

    try {
      const response = await fetch(URL)
      const data = await response.json()

      if (query && page === 1) {
        setPhotos([...data.results])
      } else if (query) {
        setPhotos((oldPhotos) => {
          return [...oldPhotos, ...data.results]
        })
      } else if (!query && page === 1) {
        setPhotos([...data])
      } else {
        setPhotos((oldPhotos) => {
          return [...oldPhotos, ...data]
        })
      }

      setLoading(false)
    } catch (error) {
      console.error('We got a problem!!')
    }
  }

  useEffect(() => {
    fetchImages()
  }, [page])

  console.log(photos);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 3) {
      setPage(oldPage => oldPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, [])

  return (
    <div className='section'>
      <Header />
      <SearchForm
        query={query}
        page={page}
        setPage={setPage}
        setQuery={setQuery}
        fetchImages={fetchImages}
      />
      <section className="photos">
        <div className="photos-center">
          {
            photos.map((photo, index) => {
              return <UnsplashImage key={index} {...photo} />
            })
          }
        {loading && <Loader />}
        </div>
      </section>
    </div>
  )
}

export default App
