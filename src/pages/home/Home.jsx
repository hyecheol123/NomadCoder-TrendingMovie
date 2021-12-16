/**
 * Home React Component which will display the home screen
 *
 * @author Hyecheol (Jerry) Jang <hyecheol123@gmail.com>
 */

import * as React from 'react';
import MovieSummary from './MovieSummary';

// API KEY for TMDB
const API_KEY = 'e17c42c71e132c1882e5746a3f0abb0d';

/**
 * React functional component to render home screen
 *
 * @return {React.ReactElement} A ReactElement referring Home
 */
const Home = () => {
  // States
  const [loading, setLoading] = React.useState(true);
  const [trendingMovies, setTrendingMovies] = React.useState([]);
  const [movieGenre, setMovieGenre] = React.useState({});
  const [baseURL, setBaseURL] = React.useState('');
  const [posterSize, setPosterSize] = React.useState('original');

  /**
   * Get trending movies from database
   */
  const getTrendingMovies = React.useCallback(async () => {
    // Requests
    const trendingMovieRequest = fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );
    const genreRequest = fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    const configRequest = fetch(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );

    // Set states
    setTrendingMovies(
      (await (await trendingMovieRequest).json()).results.slice(0, 10)
    );
    // Generate genreObj
    const genreObj = {};
    const genreResponse = (await (await genreRequest).json()).genres;
    genreResponse.forEach((obj) => (genreObj[obj.id] = obj.name));
    setMovieGenre(genreObj);
    const configuration = await (await configRequest).json();
    setBaseURL(configuration.images.secure_base_url);
    console.log(configuration.images.poster_sizes);
    if (configuration.images.poster_sizes.includes('w500')) {
      setPosterSize('w500');
    }
    setLoading(false);
  }, []);

  // Load trending movie on first load
  React.useEffect(() => {
    getTrendingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {trendingMovies.map((tm) => (
            <MovieSummary
              key={tm.id}
              id={tm.id}
              title={tm.title}
              year={parseInt(tm.release_date.substring(0, 4))}
              genre={tm.genre_ids.map((id) => movieGenre[id])}
              overview={tm.overview}
              posterImg={`${baseURL}${posterSize}/${tm.poster_path}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
