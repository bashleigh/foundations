import * as React from 'react'
import { GridItem, FormHeading, FormSubHeading, RadioSelect, Input } from '@reapit/elements'
import { AccountsInformationFormValues } from './accounts-information-form'
import formFields from './form-schema/form-fields'

export type ReapitReferenceSectionProps = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  values: AccountsInformationFormValues
}

const { hasReapitAccountsRefField, reapitAccountsRefField } = formFields

const hasReapitAccountsRefRadioOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const ReapitReferenceSection: React.FC<ReapitReferenceSectionProps> = ({ setFieldValue, values }) => {
  const { hasReapitAccountsRef } = values
  const hasReapitAccountsRefFieldDisabled = hasReapitAccountsRef === 'no'
  return (
    <GridItem>
      <FormHeading>{hasReapitAccountsRefField.heading}</FormHeading>
      <FormSubHeading>{hasReapitAccountsRefField.subHeading}</FormSubHeading>
      <RadioSelect
        isHorizontal
        labelText={hasReapitAccountsRefField.label}
        setFieldValue={setFieldValue}
        state={hasReapitAccountsRef}
        options={hasReapitAccountsRefRadioOptions}
        name={hasReapitAccountsRefField.name}
        id={hasReapitAccountsRefField.name}
      />
      <Input
        dataTest="reapitAccountsRef"
        type="text"
        id={reapitAccountsRefField.name}
        name={reapitAccountsRefField.name}
        placeholder={reapitAccountsRefField.placeHolder}
        disabled={hasReapitAccountsRefFieldDisabled}
      />
    </GridItem>
  )
}

export default ReapitReferenceSection
