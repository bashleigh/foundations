import * as React from 'react'
import { FormSection, Form, Grid, GridItem, Formik, LevelRight, Button, H5 } from '@reapit/elements'
import ReapitReferenceSection from './reapit-reference-section'
import DirectDebitSection from './direct-debit-section'
import ContactInformationSection from './contact-information-section'

export type AccountsInformationFormProps = {}

export type AccountsInformationFormValues = {
  email: string
  hasReapitAccountsRef: string
  reapitAccountsRef: string
  phoneNumber: string
  hasDirectDebit: string
  contact: string
}

export const initialValues: AccountsInformationFormValues = {
  email: '',
  contact: '',
  hasDirectDebit: 'yes',
  reapitAccountsRef: '',
  hasReapitAccountsRef: '',
  phoneNumber: '',
}

export const ACCOUNT_REF_MIN_LENGTH = 6

export const onSubmit = (values: AccountsInformationFormValues) => {
  console.log(values)
}

const AccountsInformationForm: React.FC<AccountsInformationFormProps> = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ setFieldValue, values }) => {
        const { reapitAccountsRef, hasReapitAccountsRef } = values
        const isEnableSaveBtn = hasReapitAccountsRef === 'yes' && reapitAccountsRef.length >= ACCOUNT_REF_MIN_LENGTH

        return (
          <Form>
            <FormSection>
              <H5>Accounts Information</H5>
              <Grid>
                <GridItem>
                  <ContactInformationSection />
                </GridItem>
                <GridItem>
                  <ReapitReferenceSection setFieldValue={setFieldValue} values={values} />
                  <DirectDebitSection setFieldValue={setFieldValue} values={values} />
                </GridItem>
              </Grid>
            </FormSection>
            <FormSection>
              <LevelRight>
                <Button dataTest="save-btn" type="submit" disabled={!isEnableSaveBtn}>
                  Save
                </Button>
              </LevelRight>
            </FormSection>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AccountsInformationForm
