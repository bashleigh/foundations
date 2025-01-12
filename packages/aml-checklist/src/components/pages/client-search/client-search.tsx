import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import {
  Button,
  Input,
  SelectBox,
  H3,
  AcButton,
  EntityType,
  AppParams,
  Form,
  Formik,
  Section,
  FadeIn,
} from '@reapit/elements-legacy'
import ErrorBoundary from '@/components/hocs/error-boundary'
import Routes from '@/constants/routes'
import { SearchParams, resultSetSearchParams } from '@/actions/result'
import clientSearchValidationSchema from './form-schema/validation-schema'
import formFields from './form-schema/form-fields'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export interface ClientSearchMappedActions {
  setSearchParams: (params: SearchParams) => void
}

export type ClientSearchProps = ClientSearchMappedActions & RouteComponentProps

const { nameField, addressField, identityCheckField } = formFields

const identityCheckList = [
  { label: 'Please select…', value: '' },
  { label: 'Pass', value: 'Pass' },
  { label: 'Fail', value: 'Fail' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Cancelled', value: 'Cancelled' },
  { label: 'Warnings', value: 'Warnings' },
  { label: 'Unchecked', value: 'Unchecked' },
]

// eslint-disable-next-line
export const renderForm = ({ connectIsDesktop }) => ({ values }) => {
    return (
      <>
        <H3 isHeadingSection className="mb-0">
          Client Search
        </H3>
        <Section>
          <FadeIn>
            <Form>
              <Input
                id={nameField.name}
                type="text"
                placeholder={nameField.placeHolder}
                name={nameField.name}
                labelText={nameField.label}
              />
              <Input
                id={addressField.name}
                type="text"
                placeholder={addressField.placeHolder}
                name={addressField.name}
                labelText={addressField.label}
              />
              <SelectBox
                id={identityCheckField.name}
                name={identityCheckField.name}
                labelText={identityCheckField.label}
                options={identityCheckList}
              />
              <Button className="is-right" type="submit" variant="primary">
                Search
              </Button>
              {connectIsDesktop && (
                <AcButton
                  dynamicLinkParams={{
                    entityType: EntityType.CONTACT,
                    queryParams: {
                      name: values.name,
                      address: values.address,
                      appId: window.reapit.config.appId,
                      appParam: AppParams.CONTACT_CODE,
                    },
                    appMode: connectIsDesktop ? 'DESKTOP' : 'WEB',
                  }}
                  buttonProps={{
                    type: 'button',
                    variant: 'primary',
                    disabled: !values.name && !values.address,
                  }}
                >
                  Advanced Search
                </AcButton>
              )}
            </Form>
          </FadeIn>
        </Section>
      </>
    )
  }

export const searchContacts =
  ({ setSearchParams, history }) =>
  (values: any) => {
    setSearchParams(values)
    history.push(Routes.RESULTS)
  }

export const ClientSearch: React.FunctionComponent<ClientSearchProps> = ({ setSearchParams, history }) => {
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  return (
    <ErrorBoundary>
      <Formik
        initialValues={{ [nameField.name]: '', [addressField.name]: '', [identityCheckField.name]: '' }}
        onSubmit={searchContacts({ setSearchParams, history })}
        validationSchema={clientSearchValidationSchema}
      >
        {renderForm({ connectIsDesktop })}
      </Formik>
    </ErrorBoundary>
  )
}

export const mapDispatchToProps = (dispatch: any): ClientSearchMappedActions => ({
  setSearchParams: (params: SearchParams) => dispatch(resultSetSearchParams(params)),
})

export default withRouter(connect(null, mapDispatchToProps)(ClientSearch))
