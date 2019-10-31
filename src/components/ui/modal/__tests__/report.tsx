import React from 'react'
import { shallow } from 'enzyme'
import { ReportContainer, handleContent, handleTrigger, mapStateToProps } from '../report'
import { contact } from '@/sagas/__stubs__/contact'
import { ReduxState } from '@/types/core'
import { idCheck } from '@/sagas/__stubs__/idCheck'
import { sectionsStatus } from '@/sagas/__stubs__/status'
import { defaultStatus } from '@/constants/section-status'
import { identityTypes } from '@/sagas/__stubs__/identity-types'

describe('ReportContainer', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <ReportContainer contact={contact} idCheck={idCheck} status={sectionsStatus} identityTypes={identityTypes} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('handleContent', () => {
    const mockRef = {
      current: 'mockRef'
    }
    const fn = handleContent({ printRef: mockRef })
    const result = fn()
    expect(result).toEqual('mockRef')
  })

  it('handleTrigger', () => {
    const component = handleTrigger()
    const wrapper = shallow(<div>{component}</div>)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
          checklistDetailData: {
            contact,
            idCheck
          },
          status: sectionsStatus
        },
        identityTypes: {
          identityTypes: identityTypes
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact,
        idCheck,
        status: sectionsStatus,
        identityTypes: identityTypes
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact: null,
        idCheck: null,
        status: defaultStatus,
        identityTypes: []
      })
    })
  })
})
