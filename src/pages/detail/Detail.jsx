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

  const getMovieDetail = async () => {
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
  };

  // Loading the movie detail on first load
  React.useEffect(() => {
    getMovieDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(movieDetail);

  return (
    <>
      {loading && <Loading />}
      {fail && (
        <div>
          <h1>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            Fail to Load Movie Detail
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </h1>
          <h3>Reasons for failure is listed below.</h3>
          <h3>Note that there exist more causes that lead you to the error.</h3>
          <h3>Please check again and retry.</h3>
          <ul>
            <li>The Movie Database temporarily not working.</li>
            <li>
              Not accessed from the home page. This site does not allow users to
              access directly to the movie detail screen.
            </li>
            <li>Wrong movie id provided.</li>
          </ul>
        </div>
      )}
      {!loading && !fail && (
        <div>
          <h1>{movieDetail.original_title}</h1>
          <div>
            {movieDetail.status}: {movieDetail.release_date}
          </div>
          <div>
            {movieDetail.genres.map((g) => (
              <span key={`genre_${g.id}`}>{g.name}</span>
            ))}
          </div>
          <div>
            <img
              src={POSTER_IMG}
              alt={`${movieDetail.original_title} poster`}
            />
            <div>
              <p>{movieDetail.overview}</p>
              <div>Runtime: {movieDetail.runtime} minutes</div>
              <div>
                {movieDetail.production_companies.map((pc) => (
                  <span key={`production_${pc.id}`}>{pc.name}</span>
                ))}
              </div>
              {movieDetail.homepage && (
                <a href={movieDetail.homepage}>Official Website</a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
