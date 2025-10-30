import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import Pagination from './components/Pagination';
import './styles.css';

const API_KEY = '9d0ac622ffa07b645c68a04b2b313b77';
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentSort, setCurrentSort] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // sorting logic
  const sortMovies = (movieList, sortType) => {
    if (!sortType) return movieList;

    return [...movieList].sort((a, b) => {
      switch (sortType) {
        case 'release_asc':
          return new Date(a.release_date) - new Date(b.release_date);
        case 'release_desc':
          return new Date(b.release_date) - new Date(a.release_date);
        case 'rating_asc':
          return a.vote_average - b.vote_average;
        case 'rating_desc':
          return b.vote_average - a.vote_average;
        default:
          return 0;
      }
    });
  };

  const fetchMovies = useCallback(async (query, page) => {
    setLoading(true);
    setError(null);
    try {
      let url = '';
      const isSearchMode = !!query;

      if (isSearchMode) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
      } else {
        url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setTotalPages(data.total_pages);
      setMovies(data.results);
    } catch (err) {
      console.error('API error:', err);
      setError('Error fetching movies.');
      setMovies([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(currentQuery, currentPage);
  }, [currentQuery, currentPage, fetchMovies]);

  // HANDLERS
  const handleSortChange = (sortType) => {
    setCurrentSort(sortType);
  };

  const handleSearch = (query) => {
    setCurrentQuery(query);
    setCurrentPage(1);  // new search resets page number
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const sortedMovies = sortMovies(movies, currentSort);

  return (
    <div className="App">
      <Header
        currentSort={currentSort}
        onSortChange={handleSortChange}
        onSearch={handleSearch}
      />
      <main>
        <div id="movie-cards" className="movie-cards-container">
          {loading && <p style={{ textAlign: 'center', width: '100%' }}>Loading movies...</p>}
          {error && <p style={{ textAlign: 'center', width: '100%' }}>{error}</p>}
          {!loading && !error && sortedMovies.length === 0 && (
            <p style={{ textAlign: 'center', width: '100%' }}>No movies found.</p>
          )}

          {sortedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}

export default App;