import React, { useState, useEffect, useCallback } from 'react'
import { useFormikContext } from 'formik'
import {
  Button,
  Section,
  ModalV2,
  Formik,
  Form,
  Input,
  DropdownSelect,
  notification,
  SelectOption,
  ButtonGroup,
} from '@reapit/elements'
import { createOfficeGroup } from '../../../services/office'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareOfficeOptions } from '../../../utils/prepare-options'
import { validationSchema } from './validation-schema'
import { formFields } from './form-fields'
import { OfficeModelPagedResult } from '@reapit/foundations-ts-definitions'
import debounce from 'just-debounce-it'
import useSWR from 'swr'
import { URLS } from '../../../constants/api'

export interface CreateOfficeGroupModalProps {
  visible: boolean
  setOpenCreateGroupModal: React.Dispatch<React.SetStateAction<boolean>>
  orgId: string
  onRefetchData: () => void
}

export interface CreateOfficeGroupModel {
  name: string
  officeIds: string[]
}

type SelectOptions = SelectOption[]

interface FormChangeEffectProps {
  setSelectedOffice: (options: SelectOptions) => void
  options: SelectOptions
}

export const onHandleSubmit = (handleOnClose: () => void, onRefetchData: () => void, orgId: string) => async (
  params: CreateOfficeGroupModel,
) => {
  const { name, officeIds: listId } = params
  const officeIds = listId.toString()
  const createdOffice = await createOfficeGroup({ name, officeIds }, orgId)
  if (createdOffice) {
    notification.success({
      message: toastMessages.CREATE_OFFICE_GROUP_SUCCESS,
    })
    handleOnClose()
    onRefetchData()
    return
  }

  notification.error({
    message: toastMessages.FAILED_TO_CREATE_OFFICE_GROUP,
  })
}

export const FormChangeEffect: React.FC<FormChangeEffectProps> = ({ setSelectedOffice, options }) => {
  const formik: { values: { officeIds: string[] } } = useFormikContext()
  const { officeIds } = formik.values

  useEffect(() => {
    setSelectedOffice(options.filter((item: any) => formik.values.officeIds.indexOf(item.value) !== -1))
  }, [officeIds])

  return null
}

export const CreateOfficeGroupModal: React.FC<CreateOfficeGroupModalProps> = ({
  visible,
  setOpenCreateGroupModal,
  orgId,
  onRefetchData,
}) => {
  const [searchString, setSearchString] = useState<string>('')
  const [selectedOffice, setSelectedOffice] = useState<SelectOptions>([])
  const [options, setOptions] = useState<SelectOptions>([])
  const debouncedSearch = useCallback(
    debounce((value: string) => setSearchString(value), 500),
    [500],
  )
  const { data: offices } = useSWR<OfficeModelPagedResult | undefined>(
    !orgId || !searchString ? null : `${URLS.OFFICES}?pageSize=999&organisationId=${orgId}&name=${searchString}`,
  )
  const { name, officeIds } = formFields

  const handleOnClose = () => setOpenCreateGroupModal(false)
  const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, orgId)

  useEffect(() => {
    if (offices) {
      const { _embedded: listOffice } = offices
      const officeOptions = prepareOfficeOptions(listOffice || [])
      setOptions([...selectedOffice, ...officeOptions])
    }
  }, [offices])

  return (
    <ModalV2 visible={visible} destroyOnClose={true} onClose={handleOnClose} title="Create Office Group" zIndex={90}>
      <p className="helper-text">
        <p>
          To create a new office group, please provide a group ‘Name’ and search and select an Office(s). You will need
          a minimum of 1 office to create a new group.
        </p>
      </p>
      <Formik initialValues={{ name: '', officeIds: [] }} onSubmit={onSubmit} validationSchema={validationSchema}>
        {() => {
          return (
            <Form noValidate={true}>
              <Section hasPadding={false} hasMargin={false}>
                <Input type="text" labelText={name.label} id={name.name} name={name.name} required />
                <DropdownSelect
                  mode="multiple"
                  id={officeIds.name}
                  placeholder="Please select"
                  name={officeIds.name}
                  labelText={officeIds.label}
                  options={options}
                  onSearch={(value: string) => debouncedSearch(value)}
                  required
                  filterOption={true}
                  optionFilterProp="children"
                />
                <FormChangeEffect setSelectedOffice={setSelectedOffice} options={options} />
              </Section>
              <ButtonGroup isCentered hasSpacing>
                <Button variant="secondary" disabled={false} onClick={handleOnClose} type="button">
                  Cancel
                </Button>
                <Button variant="primary" loading={false} type="submit">
                  Create
                </Button>
              </ButtonGroup>
            </Form>
          )
        }}
      </Formik>
    </ModalV2>
  )
}

export default CreateOfficeGroupModal