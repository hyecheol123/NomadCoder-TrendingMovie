/**
 * MovieSummary React Component which will be used to display each movie summary
 *   box on the Home screen
 *
 * @author Hyecheol (Jerry) Jang <hyecheol123@gmail.com>
 */

import * as React from 'react';

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
 * @return {React.ReactElement} A ReactElement referring MovieSummary
 */
const MovieSummary = ({ id, title, year, genre, overview, posterImg }) => {
  console.log(year);
  return (
    <div>
      <img src={posterImg} alt={`${title} poster`} />
      <div>{title}</div>
      <div>{year}</div>
      <div>
        {genre.map((g) => (
          <span key={`${id}_${g}`}>{g}</span>
        ))}
      </div>
      <p>{overview}</p>
    </div>
  );
};

export default MovieSummary;
