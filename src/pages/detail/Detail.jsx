/**
 * Detail React Component which will display the movie detail screen
 *
 * @author Hyecheol (Jerry) Jang <hyecheol123@gmail.com>
 */

import * as React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../components/Loading';
import styles from '../../../styles/detail/Detail.module.css';

/**
 * React functional component to show the movie's detail
 *
 * @return {React.ReactElement} A ReactElement referring Detail
 */
const Detail = () => {
  // Retrieve movie id from URL
  const { id: movieId } = useParams();
  const location = useLocation();
  const API_KEY = location.state ? location.state.apiKey : undefined;
  const POSTER_IMG = location.state ? location.state.posterImg : undefined;

  // States
  const [loading, setLoading] = React.useState(true);
  const [movieDetail, setMovieDetail] = React.useState({});
  const [fail, setFail] = React.useState(false);

  /**
   * Get movie detail from the database
   */
  const getMovieDetail = React.useCallback(async () => {
    try {
      // Request
      const movieDetailRequest = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      if (movieDetailRequest.status >= 200 && movieDetailRequest.status < 300) {
        // Set state with the information when success
        setMovieDetail(await movieDetailRequest.json());
      } else {
        throw new Error();
      }
    } catch (e) {
      // When error occurred, set fail as true
      setFail(true);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loading the movie detail on first load
  React.useEffect(() => {
    getMovieDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <Loading />}
      {fail && (
        <div className={styles.Warning}>
          <h1 className={styles.Title}>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            Loading Fail
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </h1>
          <div className={styles.ContentWrapper}>
            <h3>Reasons for failure is listed below.</h3>
            <h3>
              Note that there exist more causes that lead you to the error.
            </h3>
            <h3>Please check again and retry.</h3>
            <ul>
              <li>The Movie Database temporarily not working.</li>
              <li>
                Not accessed from the home page. This site does not allow users
                to access directly to the movie detail screen.
              </li>
              <li>Wrong movie id provided.</li>
            </ul>
          </div>
        </div>
      )}
      {!loading && !fail && (
        <div className={styles.ContentWrapper}>
          <h1 className={styles.Title}>{movieDetail.original_title}</h1>
          <div className={styles.MovieDetailWrapper}>
            <div className={styles.MovieDetail}>
              <div className={styles.Date}>
                {movieDetail.status}: {movieDetail.release_date}
              </div>
              <div className={styles.GenreWrapper}>
                {movieDetail.genres.map((g) => (
                  <span key={`genre_${g.id}`}>{g.name}</span>
                ))}
              </div>
              <div className={styles.InformationWrapper}>
                <img
                  src={POSTER_IMG}
                  alt={`${movieDetail.original_title} poster`}
                />
                <div className={styles.Information}>
                  <div className={styles.ElementWrapper}>
                    <h3>Overview</h3>
                    <p>{movieDetail.overview}</p>
                  </div>
                  <div className={styles.ElementWrapper}>
                    <h3>Runtime</h3>
                    <div>{movieDetail.runtime} minutes</div>
                  </div>
                  <div className={styles.ElementWrapper}>
                    <h3>Production Companies</h3>
                    {movieDetail.production_companies.map((pc) => (
                      <div key={`production_${pc.id}`}>{pc.name}</div>
                    ))}
                  </div>
                  {movieDetail.homepage && (
                    <div className={styles.ElementWrapper}>
                      <h3>Official Website</h3>
                      <a href={movieDetail.homepage}>
                        <div>{movieDetail.homepage}</div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
