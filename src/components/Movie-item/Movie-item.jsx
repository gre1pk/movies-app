import { Card, Typography, Button } from 'antd'
import './Movie-item.css'

function MovieItem({ title, releaseDate, posterPath, overview }) {
  const { Text, Title } = Typography
  return (
    <Card className="card">
      <div className="card__img">
        <img alt={`poster ${title}`} src={`https://image.tmdb.org/t/p/w500/${posterPath} `} />
      </div>
      <div className="card_content">
        <Title level={4} className="card__movie-title">
          {title}
        </Title>
        <Text type="secondary" className="card__release-date">
          {releaseDate}
        </Text>
        <Button size="small" style={{ marginRight: 8 }}>
          Action
        </Button>
        <Button size="small">Dramma</Button>
        <Text className="card__overview">{overview}</Text>
      </div>
    </Card>
  )
}

export default MovieItem
