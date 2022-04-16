export default class MoviDbService {
  baseUrl = 'https://api.themoviedb.org/3'

  apiKey = '73b1607922621484d0253db697cda937'

  async getResurse(url) {
    const res = await fetch(`${this.baseUrl}${url}`)
    return res.json()
  }

  async getSearchMovies(search = 'return', page = '1') {
    const res = await this.getResurse(
      `/search/movie/?api_key=${this.apiKey}&language=en-US&query=${search}&page=${page}`
    )
    return res.results
  }
}
