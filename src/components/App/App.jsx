import React from 'react'
import { Layout, Spin, Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'
import './App.css'

import MoviDbService from '../../services/moviDbService'
import MoveList from '../Move-list'
import PageHeader from '../Page-header'
import SearchMovies from '../SearchMovies'

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
    }
  }

  componentDidMount() {
    this.onLoadMovies()
  }

  componentDidUpdate(_, prevState) {
    const { queryStr, currentPages } = this.state
    if (prevState.queryStr !== queryStr || prevState.currentPages !== currentPages) {
      this.onLoadMovies()
    }
  }

  onTogleTab = (tabName) => {
    this.setState({ tabActive: tabName })
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

  onLoadMovies = () => {
    const { queryStr, currentPages } = this.state
    this.moviesDb
      .getSearchMovies(queryStr, currentPages)
      .then((res) => {
        this.setState({ movies: res.results, loading: false, totalPages: res.totalPages })
      })
      .catch(this.onError)
  }

  render() {
    const { Content } = Layout
    const { movies, loading, error, totalPages, currentPages, tabActive } = this.state

    const hasDate = !(loading || error)
    const errorMsg = error ? <Alert message="Error" type="error" /> : null
    const spiner = loading ? <Spin className="spiner" size="large" /> : null
    const content = hasDate ? (
      <MoveList
        movies={movies}
        totalPages={totalPages}
        currentPages={currentPages}
        onCurrentPages={this.onCurrentPages}
      />
    ) : null
    const searchPanel = tabActive === 'search' ? <SearchMovies searchValue={this.onSearchMovies} /> : null

    return (
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
        </Online>
        <Offline>
          <h1>you are not online</h1>
        </Offline>
      </div>
    )
  }
}
