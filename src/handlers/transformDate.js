function trasformDate(re) {
  return {
    id: re.id,
    originalTitle: re.original_title,
    releaseDate: re.release_date,
    posterPath: re.poster_path,
    overview: re.overview,
  }
}

export default trasformDate
