function transformMovies(result) {
  return {
    page: result.page,
    results: result.results,
    totalPages: result.total_pages,
    totalResults: result.total_results,
  }
}

export default class MoviDbService {
  baseUrl = 'https://api.themoviedb.org/3'

  apiKey = '73b1607922621484d0253db697cda937'

  async getResurse(url) {
    try {
      const result = await fetch(`${this.baseUrl}${url}`)
      if (!result.ok) {
        throw new Error(`${result.status}`)
      }
      return await result.json()
    } catch (err) {
      throw new Error(err)
    }
  }

  async getGenresId() {
    const res = await this.getResurse(`/genre/movie/list?api_key=${this.apiKey}&language=en-US`)
    return res
  }

  async getSessionID() {
    const res = await this.getResurse(`/authentication/guest_session/new?api_key=${this.apiKey}`)
    return res
  }

  async getSearchMovies(search = 'return', page = '1') {
    const res = await this.getResurse(
      `/search/movie/?api_key=${this.apiKey}&language=en-US&query=${search}&page=${page}`
    )
    return transformMovies(res)
  }

  async getRatedMovies(sessionId) {
    const res = await this.getResurse(`/guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}`)

    return transformMovies(res)
  }
}
