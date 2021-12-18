/**
 * MovieSummary React Component which will be used to display each movie summary
 *   box on the Home screen
 *
 * @author Hyecheol (Jerry) Jang <hyecheol123@gmail.com>
 */

import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/home/MovieSummary.module.css';

/**
 * React functional component to show the movie's summary
 *
 * @param {object} props Properties that passed from the parent Component.
 * @param {number} props.id unique id for the movie
 * @param {string} props.title title of the movie
 * @param {number} props.year which year did the movie release
 * @param {string[]} props.genre Array containing the movie's genre
 * @param {string} props.overview text summary of movie
 * @param {string} props.posterImg path to the posterImg
 * @param {string} props.apiKey API Key for "the movie database"
 * @return {React.ReactElement} A ReactElement referring MovieSummary
 */
const MovieSummary = ({
  id,
  title,
  year,
  genre,
  overview,
  posterImg,
  apiKey,
}) => {
  return (
    <Link to={`/movie/${id}`} state={{ apiKey: apiKey, posterImg: posterImg }}>
      <div className={styles.MovieSummary}>
        <img src={posterImg} alt={`${title} poster`} />
        <div className={styles.InformationWrapper}>
          <div className={styles.Title}>{title}</div>
          <div className={styles.Year}>{year}</div>
          <div className={styles.Genre}>
            {genre.map((g) => (
              <span key={`${id}_${g}`}>{g}</span>
            ))}
          </div>
          <p className={styles.Overview}>{overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieSummary;
