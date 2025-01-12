import * as React from 'react'
import { FormHeading, FormSubHeading, Input } from '@reapit/elements-legacy'
import formFields from './form-schema/form-fields'

export type ContactInformationSectionProps = { disabled?: boolean }

const { billingEmailField, billingTelephoneField, billingKeyContactField } = formFields

const ContactInformationSection: React.FC<ContactInformationSectionProps> = ({ disabled }) => {
  return (
    <>
      <FormHeading>{billingEmailField.heading}</FormHeading>
      <FormSubHeading>{billingEmailField.subHeading}</FormSubHeading>
      <Input
        dataTest="email"
        type="email"
        id={billingEmailField.name}
        name={billingEmailField.name}
        placeholder={billingEmailField.placeHolder}
        disabled={disabled}
      />
      <FormHeading>{billingTelephoneField.heading}</FormHeading>
      <FormSubHeading>{billingTelephoneField.subHeading}</FormSubHeading>
      <Input
        dataTest="phoneNumber"
        type="text"
        id={billingTelephoneField.name}
        name={billingTelephoneField.name}
        placeholder={billingTelephoneField.placeHolder}
        disabled={disabled}
      />
      <FormHeading>{billingKeyContactField.heading}</FormHeading>
      <FormSubHeading>{billingKeyContactField.subHeading}</FormSubHeading>
      <Input
        dataTest="contact"
        type="text"
        id={billingKeyContactField.name}
        name={billingKeyContactField.name}
        placeholder={billingKeyContactField.placeHolder}
        disabled={disabled}
      />
    </>
  )
}

export default ContactInformationSection
