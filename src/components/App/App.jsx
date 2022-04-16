import React from 'react'
import { Layout } from 'antd'
import './App.css'

import MoviDbService from '../../services/moviDbService'
import Movelist from '../Move-list'

export default class App extends React.Component {
  moviesDb = new MoviDbService()

  constructor() {
    super()
    this.state = {
      movies: [],
    }
    this.loadMoviesServer()
  }

  loadMoviesServer() {
    this.moviesDb.getSearchMovies().then((res) => {
      this.setState({ movies: res })
    })
  }

  render() {
    const { Content } = Layout
    const { movies } = this.state

    return (
      <div className="container">
        <Layout className="layout">
          <Content className="main">
            <Movelist movies={movies} />
          </Content>
        </Layout>
      </div>
    )
  }
}
