function trasformDate(movie) {
  return {
    id: movie.id,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    posterPath: movie.poster_path,
    overview: movie.overview,
    voteAverage: movie.vote_average,
    movieGenre: movie.genre_ids,
  }
}

export default trasformDate
