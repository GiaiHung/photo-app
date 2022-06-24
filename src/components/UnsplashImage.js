import React from 'react'

const UnsplashImage = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium }
  }
}) => {
  return (
    <article className="photo">
      <img src={regular} alt={alt_description} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>Likes: {likes}</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} className='user-img' alt="user-img" />
        </a>
      </div>
    </article>
  )
}

export default UnsplashImage
