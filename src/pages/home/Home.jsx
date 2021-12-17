/**
 * Home React Component which will display the home screen
 *
 * @author Hyecheol (Jerry) Jang <hyecheol123@gmail.com>
 */

import * as React from 'react';
import MovieSummary from './MovieSummary';
import styles from '../../../styles/home/Home.module.css';

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
    const trendingMovieRequest1 = fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=1`
    );
    const trendingMovieRequest2 = fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=2`
    );
    const genreRequest = fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    const configRequest = fetch(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );

    // Set states
    const movieResult1 = (await (await trendingMovieRequest1).json()).results;
    const movieResult2 = (await (await trendingMovieRequest2).json()).results;
    setTrendingMovies([...movieResult1, ...movieResult2]);
    // Generate genreObj
    const genreObj = {};
    const genreResponse = (await (await genreRequest).json()).genres;
    genreResponse.forEach((obj) => (genreObj[obj.id] = obj.name));
    setMovieGenre(genreObj);
    const configuration = await (await configRequest).json();
    setBaseURL(configuration.images.secure_base_url);
    if (configuration.images.poster_sizes.includes('w154')) {
      setPosterSize('w154');
    }
    setLoading(false);
  }, []);

  /**
   * Cut the overview which will be displayed on the page
   *
   * @param {string} overview movie overview
   * @return {string} cutted overview having maximum length of 190
   */
  const cutOverview = React.useCallback((overview) => {
    const token = overview.split(' ');
    let index = 0;
    let resultOverview = '';

    console.log(token);

    // Generate cutted overview having length less than 190
    while (
      index < token.length &&
      resultOverview.length + token[index].length <= 186
    ) {
      resultOverview += ` ${token[index]}`;
      ++index;
    }
    if (token.length !== index) {
      resultOverview += ' ...';
    }

    return resultOverview;
  }, []);

  // Load trending movie on first load
  React.useEffect(() => {
    getTrendingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.Loading}></div>
      ) : (
        <div className={styles.MovieWrapper}>
          {trendingMovies.map((tm) => (
            <MovieSummary
              key={tm.id}
              id={tm.id}
              title={tm.title}
              year={parseInt(tm.release_date.substring(0, 4))}
              genre={tm.genre_ids.map((id) => movieGenre[id])}
              overview={cutOverview(tm.overview)}
              posterImg={`${baseURL}${posterSize}/${tm.poster_path}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
