import * as React from 'react'
import { openChatbot } from '../../../../scripts/chat-bot'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import {
  DeveloperHelpPage,
  handleReportBug,
  handleRequestEndpoint,
  handleFaq,
  handleViewRoadmap,
  handleWhatsNew,
} from '../help'
import configureStore from 'redux-mock-store'
import { HelpLinks } from '@/constants/developer-help-links'
import appState from '@/reducers/__stubs__/app-state'
import { LoginIdentity } from '@reapit/connect-session'

jest.mock('../../../../scripts/chat-bot')

jest.mock('../../../../core/router', () => ({
  history: {
    push: jest.fn(),
  },
}))

jest.mock('@reapit/connect-session', () => ({
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        developerId: 'SOME_ID',
      },
    },
  })),
  ReapitConnectBrowserSession: jest.fn(),
}))
afterEach(() => {
  jest.clearAllMocks()
})

describe('DeveloperHelpPage', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  it('should match a snapshot where there is no developer id', () => {
    window.reapit.config.liveChatWhitelist = []
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <DeveloperHelpPage />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where there is a developer id', () => {
    window.reapit.config.liveChatWhitelist = ['SOME_ID']
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <DeveloperHelpPage />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleReportBug', () => {
  it('should called with correct props', () => {
    handleReportBug()
    expect(window.open).toHaveBeenCalledWith(HelpLinks.BUG_REPORT, '_blank')
  })
})

describe('handleRequestEndpoint', () => {
  it('should called with correct props', () => {
    handleRequestEndpoint()
    expect(window.open).toHaveBeenCalledWith(HelpLinks.API_REQUEST, '_blank')
  })
})

describe('handleViewRoadmap', () => {
  it('should called with correct props', () => {
    handleViewRoadmap()
    expect(window.open).toHaveBeenCalledWith(HelpLinks.ROADMAP, '_blank')
  })
})

describe('handleWhatsNew', () => {
  it('should called with correct props', () => {
    handleWhatsNew()
    expect(window.open).toHaveBeenCalledWith(HelpLinks.WHATS_NEW, '_blank')
  })
})

describe('handleFaq', () => {
  it('should called with correct props', () => {
    handleFaq({} as LoginIdentity)
    expect(openChatbot).toHaveBeenCalledTimes(1)
  })
})
