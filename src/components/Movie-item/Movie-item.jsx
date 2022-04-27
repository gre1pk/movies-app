import { Card, Typography, Tag } from 'antd'
import './Movie-item.css'
import PropTypes from 'prop-types'

import RateStars from '../Rate-stars'
import { GenresConsumer } from '../Genres-context'

import poster from './poster.jpeg'

function MovieItem({ title, releaseDate, posterPath, overview, voteAverage, movieGenre, rating, idMovie }) {
  const { Text, Title } = Typography
  let posterMovie = `https://image.tmdb.org/t/p/w500/${posterPath} `
  if (!posterPath) {
    posterMovie = poster
  }

  const colorReiting = (reit) => {
    if (reit > 7) {
      return 'max'
    }
    if (reit > 5) {
      return 'norm'
    }

    if (reit > 3) {
      return 'poor'
    }
    return 'low'
  }

  const generis = (genresId, movieGenreList) => {
    const element = movieGenreList.map((id) => {
      const re = genresId.filter((el) => el.id === id)
      return (
        // tut ohibka v name !!!!!!!
        <Tag key={id} size="small">
          {re[0].name}
        </Tag>
      )
    })
    return element
  }

  return (
    <Card className="card">
      <div className="card__img">
        <img alt={`poster ${title}`} src={posterMovie} />
      </div>
      <div className="card__content">
        <div className="card__header">
          <Title level={4} className="card__movie-title">
            {title}
          </Title>
          <div className={`card__reiting ${colorReiting(voteAverage)}`}>{voteAverage}</div>
        </div>
        <Text type="secondary" className="card__release-date">
          {releaseDate}
        </Text>
        <div className="div">
          <GenresConsumer>{(genresId) => generis(genresId, movieGenre)}</GenresConsumer>
        </div>
        <Text className="card__overview">{overview}</Text>
        <div className="card__rate">
          <RateStars rating={rating} idMovie={idMovie} />
        </div>
      </div>
    </Card>
  )
}

MovieItem.defaultProps = {
  title: 'not Name',
  releaseDate: 'unknown date',
  posterPath: null,
  overview: 'not Text',
  voteAverage: 0,
  movieGenre: [],
  rating: 0,
}

MovieItem.propTypes = {
  title: PropTypes.string,
  releaseDate: PropTypes.string,
  posterPath: PropTypes.string,
  overview: PropTypes.string,
  voteAverage: PropTypes.number,
  movieGenre: PropTypes.arrayOf(PropTypes.number),
  rating: PropTypes.number,
  idMovie: PropTypes.number.isRequired,
}

export default MovieItem
