import React from 'react'
import { shallow } from 'enzyme'
import DeveloperSettingsPage from '../developer-settings'
import { ReduxState } from '@/types/core'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'

const mockState = {
  ...appState,
  auth: {
    loginSession: {
      loginIdentity: {
        isAdmin: true,
      },
    },
  },
} as ReduxState

describe('DeveloperSettingsPage', () => {
  it('should match snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(mockState)

    const wrapper = shallow(
      <Provider store={store}>
        <DeveloperSettingsPage />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})