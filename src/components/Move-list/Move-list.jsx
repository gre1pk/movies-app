import { Row, Col } from 'antd'
import format from 'date-fns/format'

import cutTexst from '../../handlers/cutText'
import MovieItem from '../Movie-item'

function MoveList({ movies }) {
  const elements = movies.map((el) => {
    const { id, original_title: originalTitle, release_date: releaseDate, poster_path: posterPath, overview } = el
    const dateFns = format(new Date(releaseDate), 'MMMM d, yyyy')
    const text = cutTexst(overview, 150)

    return (
      <Col span={12} key={id}>
        <MovieItem title={originalTitle} releaseDate={dateFns} posterPath={posterPath} overview={text} />
      </Col>
    )
  })

  return <Row gutter={[36, 37]}>{elements}</Row>
}

export default MoveList
