import React from 'react';

// need to do something about this after repo stuff
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';

  return (
    <div className="movie-card">
      <img src={poster} alt={movie.title} />
      <div className="card-info" style={{ textAlign: 'center' }}>
        <h3 style={{ fontWeight: 'bold' }}>{movie.title}</h3>
        <p style={{ fontSize: '14px' }}>Release Date: {movie.release_date || 'N/A'}</p>
        <p style={{ fontSize: '14px' }} className="rating">Rating: {movie.vote_average || 'N/A'}</p>
      </div>
    </div>
  );
};

export default MovieCard;