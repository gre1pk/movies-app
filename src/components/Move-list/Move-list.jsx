import { Row, Col, Alert } from 'antd'
import format from 'date-fns/format'
import PropTypes from 'prop-types'

import './Move-list.css'
import cutText from '../../handlers/cutText'
import MovieItem from '../Movie-item'
import { trasformDate } from '../../handlers/transformDate'

function MoveList({ movies }) {
  if (movies.length < 1) {
    return <Alert message="not found" />
  }
  const elements = movies.map((el) => {
    const newEl = trasformDate(el)
    const { id, originalTitle, releaseDate, posterPath, overview, voteAverage, movieGenre, rating } = newEl
    let dateFns = 'unknown date'

    if (releaseDate) {
      dateFns = format(new Date(releaseDate), 'MMMM d, yyyy')
    }

    const textOverview = cutText(overview, 80)

    return (
      <Col span={12} key={id}>
        <MovieItem
          title={originalTitle}
          releaseDate={dateFns}
          posterPath={posterPath}
          overview={textOverview}
          voteAverage={voteAverage}
          movieGenre={movieGenre}
          rating={rating}
          idMovie={id}
        />
      </Col>
    )
  })

  return <Row gutter={[36, 37]}>{elements}</Row>
}

MoveList.defaultProps = {
  movies: [],
}

MoveList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.objectOf),
}

export default MoveList
