import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReduxState } from '../../types/core'
import { HomeState } from '../../reducers/home'
import { homeClearData, homeRequestData } from '../../actions/home'
import Routes from '../../constants/routes'
import Loader from '../ui/loader'
import ErrorBoundary from '../hocs/error-boundary'

export interface HomeMappedActions {
  homeClearData: () => void
  homeRequestData: () => void
}

export interface HomeMappedProps {
  homeState: HomeState
}
export type HomeProps = HomeMappedActions & HomeMappedProps

export const Home: React.FunctionComponent<HomeProps> = ({ homeClearData, homeRequestData, homeState }) => (
  <div className="container">
    <h1 className="h1">React JS</h1>
    <ul className="nav">
      <li className="nav-item">
        <a className="nav-link" onClick={homeClearData}>
          Clear All
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={homeRequestData}>
          Fetch All
        </a>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={Routes.ITEM}>
          Item Page
        </Link>
      </li>
    </ul>
    {homeState.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary>
        <div className="list-group">
          {homeState.homeData &&
            homeState.homeData.data.children.map(child => (
              <div key={child.data.id}>
                <a className="list-group-item list-group-item-action" target="_blank" href={child.data.url}>
                  {child.data.title}
                </a>
              </div>
            ))}
        </div>
      </ErrorBoundary>
    )}
  </div>
)

const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  homeState: state.home
})

const mapDispatchToProps = (dispatch: any): HomeMappedActions => ({
  homeClearData: () => dispatch(homeClearData(null)),
  homeRequestData: () => dispatch(homeRequestData())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
