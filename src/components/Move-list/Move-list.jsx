import { Row, Col, Alert, Pagination } from 'antd'
import format from 'date-fns/format'
import PropTypes from 'prop-types'

import './Move-list.css'
import cutText from '../../handlers/cutText'
import MovieItem from '../Movie-item'
import { trasformDate } from '../../handlers/transformDate'

function MoveList({ movies, totalPages, currentPages, onCurrentPages }) {
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

  return (
    <>
      <Row gutter={[36, 37]}>{elements}</Row>
      <Pagination
        className="pagination"
        total={totalPages}
        showSizeChanger={false}
        current={currentPages}
        onChange={onCurrentPages}
      />
    </>
  )
}

MoveList.defaultProps = {
  movies: [],
  totalPages: 1,
  currentPages: 1,
  onCurrentPages: () => {},
}

MoveList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.objectOf),
  totalPages: PropTypes.number,
  currentPages: PropTypes.number,
  onCurrentPages: PropTypes.func,
}

export default MoveList
