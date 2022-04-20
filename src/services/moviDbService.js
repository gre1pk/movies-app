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

  async getSearchMovies(search = 'return', page = '1') {
    const res = await this.getResurse(
      `/search/movie/?api_key=${this.apiKey}&language=en-US&query=${search}&page=${page}`
    )
    const newFormatObj = transformMovies(res)
    return newFormatObj
  }
}
