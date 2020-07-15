import React from 'react'
import { DeveloperModel, UpdateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { useSelector } from 'react-redux'
import { shallow } from 'enzyme'
import OrganisationForm, { generateInitialValues, defaultInitialValues, handleSubmit } from '../organisation-form'
import appState from '@/reducers/__stubs__/app-state'

const developerInformation: DeveloperModel | null = appState.settings.developerInfomation
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(() => developerInformation),
}))

describe('OrganisationForm', () => {
  it('should match a snapshot when no error', () => {
    expect(shallow(<OrganisationForm />)).toMatchSnapshot()
  })
  it('should match a snapshot when have developerInfo', () => {
    ;(useSelector as jest.Mocked<any>).mockReturnValueOnce(() => null)
    expect(shallow(<OrganisationForm />)).toMatchSnapshot()
  })
})

describe('generateInitialValues', () => {
  it('should return default if dont have developerInfo', () => {
    expect(generateInitialValues({ developerInfo: null, defaultInitialValues })).toEqual(defaultInitialValues)
  })
  it('should return correctly if have developerInfo', () => {
    const { companyAddress = {}, ...otherData } = developerInformation as DeveloperModel
    const { line1, line2, line3, line4, buildingName, buildingNumber, postcode, countryId } = companyAddress
    const {
      about,
      company: companyName,
      taxNumber,
      noTaxRegistration,
      email,
      registrationNumber,
      telephone,
      website,
      nationalInsurance,
    } = otherData
    const expectedValues = {
      about,
      countryId,
      companyName,
      // TBC
      iconImageUrl: '',
      buildingName,
      buildingNumber,
      line1,
      line2,
      line3,
      line4,
      taxNumber,
      noTaxRegistration,
      email,
      postcode,
      registrationNumber,
      noRegistrationNumber: !registrationNumber,
      telephone,
      website,
      nationalInsurance,
    }
    expect(generateInitialValues({ developerInfo: developerInformation, defaultInitialValues })).toEqual(expectedValues)
  })
})

describe('handleSubmit', () => {
  it('should build data and submit correctly', () => {
    const values = {
      buildingName: 'tes',
      buildingNumber: '1212',
      line1: '',
      line2: '',
      line3: '',
      line4: '',
      postcode: '1212',
      countryId: 'AF',
      about: '',
      companyName: 'REAPIT Ltd.2123znww',
      iconImageUrl: '',
      taxNumber: '',
      noTaxRegistration: false,
      email: 'cbryan@reapit.com',
      registrationNumber: '12341',
      noRegistrationNumber: false,
      telephone: '08261826162',
      website: 'https://google.com',
      nationalInsurance: '010212',
    }
    const expectedValues = {
      companyAddress: {
        buildingName: 'tes',
        buildingNumber: '1212',
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        postcode: '1212',
        countryId: 'AF',
      },
      about: '',
      companyName: 'REAPIT Ltd.2123znww',
      taxNumber: '',
      noTaxRegistration: false,
      email: 'cbryan@reapit.com',
      registrationNumber: '12341',
      noRegistrationNumber: false,
      telephone: '08261826162',
      website: 'https://google.com',
      nationalInsurance: '010212',
    } as UpdateDeveloperModel
    const updateDispatchMock = jest.fn()
    const fn = handleSubmit(updateDispatchMock)
    fn(values)
    expect(updateDispatchMock).toHaveBeenCalledWith(expectedValues)
  })
})