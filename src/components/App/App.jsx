import React from 'react'
import { Layout, Spin, Alert, Pagination } from 'antd'
import { Offline, Online } from 'react-detect-offline'
import './App.css'

import MoviDbService from '../../services/moviDbService'
import MoveList from '../Move-list'
import PageHeader from '../Page-header'
import SearchMovies from '../SearchMovies'
import { GenresProvider } from '../Genres-context'

export default class App extends React.Component {
  moviesDb = new MoviDbService()

  constructor() {
    super()
    this.state = {
      movies: [],
      loading: true,
      error: false,
      queryStr: 'return',
      totalPages: 1,
      currentPages: 1,
      tabActive: 'search',
      genresId: [],
    }
  }

  componentDidMount() {
    this.onLoadMovies()
    this.onLoadGenres()
    this.onLoadSessionID()
  }

  componentDidUpdate(_, prevState) {
    const { queryStr, currentPages } = this.state
    if (prevState.queryStr !== queryStr || prevState.currentPages !== currentPages) {
      this.onLoadMovies()
    }
  }

  onTogleTab = (tabName) => {
    if (tabName === 'search') {
      this.onLoadMovies()
    } else {
      this.onGetRatedMovies()
    }
    this.setState({ tabActive: tabName, loading: true })
  }

  onSearchMovies = (text) => {
    this.setState({
      loading: true,
      error: false,
      queryStr: text,
    })
  }

  onCurrentPages = (page) => {
    this.setState({ loading: true, error: false, currentPages: page })
  }

  onError = () => {
    this.setState({ loading: false, error: true })
  }

  onLoadGenres = () => {
    this.moviesDb
      .getGenresId()
      .then((res) => {
        this.setState({ genresId: res.genres })
      })
      .catch(this.onError)
  }

  onLoadSessionID = () => {
    const idLocal = localStorage.getItem('sessionId')
    if (!idLocal) {
      this.moviesDb.getSessionID().then((res) => localStorage.setItem('sessionId', res.sessionId))
    }
  }

  onLoadMovies = () => {
    const { queryStr, currentPages } = this.state
    this.moviesDb
      .getSearchMovies(queryStr, currentPages)
      .then((res) => {
        this.setState({ movies: res.results, loading: false, totalPages: res.totalPages })
      })
      .catch(this.onError)
  }

  onGetRatedMovies = () => {
    const sessionId = localStorage.getItem('sessionId')
    this.moviesDb
      .getRatedMovies(sessionId)
      .then((res) => this.setState({ movies: res.results, loading: false, totalPages: res.totalPages }))
      .catch(this.onError)
  }

  render() {
    const { Content } = Layout
    const { movies, loading, error, totalPages, currentPages, tabActive, genresId } = this.state

    const hasDate = !(loading || error)
    const errorMsg = error ? <Alert message="Error" type="error" /> : null
    const spiner = loading ? <Spin className="spiner" size="large" /> : null
    const content = hasDate ? <MoveList movies={movies} /> : null
    const searchPanel = tabActive === 'search' ? <SearchMovies searchValue={this.onSearchMovies} /> : null
    const paginationPanel =
      tabActive === 'search' ? (
        <Pagination
          className="pagination"
          showSizeChanger={false}
          current={currentPages}
          total={totalPages}
          onChange={this.onCurrentPages}
        />
      ) : null

    return (
      <GenresProvider value={genresId}>
        <div className="container">
          <Online>
            <Layout className="layout">
              <PageHeader onTogleTab={this.onTogleTab} />
              <Content className="main">
                {searchPanel}
                {errorMsg}
                {spiner}
                {content}
              </Content>
            </Layout>
            {paginationPanel}
          </Online>
          <Offline>
            <h1>you are not online</h1>
          </Offline>
        </div>
      </GenresProvider>
    )
  }
}
