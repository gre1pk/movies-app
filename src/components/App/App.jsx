import React from 'react'
import { Layout, Spin, Alert } from 'antd'
import './App.css'

import MoviDbService from '../../services/moviDbService'
import MoveList from '../Move-list'

export default class App extends React.Component {
  moviesDb = new MoviDbService()

  constructor() {
    super()
    this.state = {
      movies: [],
      loading: true,
      error: false,
    }
    this.onLoadMovies()
  }

  onError = () => {
    this.setState({ loading: false, error: true })
  }

  onLoadMovies() {
    this.moviesDb
      .getSearchMovies()
      .then((res) => {
        this.setState({ movies: res.results, loading: false })
      })
      .catch(this.onError)
  }

  render() {
    const { Content } = Layout
    const { movies, loading, error } = this.state

    const hasDate = !(loading || error)
    const errorMsg = error ? <Alert message="Error" type="error" /> : null
    const spiner = loading ? <Spin size="large" className="spiner" /> : null
    const content = hasDate ? <MoveList movies={movies} /> : null

    return (
      <div className="container">
        <Layout className="layout">
          <Content className="main">
            {errorMsg}
            {spiner}
            {content}
          </Content>
        </Layout>
      </div>
    )
  }
}
