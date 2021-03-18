import React, { useCallback } from 'react'
import useSWR from 'swr'
import qs from 'query-string'
import { FormFieldInfo } from '@reapit/utils'
import {
  Button,
  Section,
  ModalV2,
  Formik,
  Form,
  Input,
  DropdownSelect,
  Loader,
  notification,
  ButtonGroup,
} from '@reapit/elements'
import { UserModel, GroupModelPagedResult } from '../../../types/organisations-schema'
import { URLS } from '../../../constants/api'
import { updateUser } from '../../../services/user'
import { toastMessages } from '../../../constants/toast-messages'
import { prepareUserGroupOptions } from '../../../utils/prepare-options'

export interface UpdateUserModalProps {
  editingUser: UserModel | undefined
  setEditingUser: React.Dispatch<React.SetStateAction<UserModel | undefined>>
  onRefetchData: () => void
  orgId: string
}

interface UpdateUserModel {
  name: string
  groupIds: string[]
}

type FieldType = 'name' | 'groupIds'

export const formFields: Record<FieldType, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'Name',
  },
  groupIds: {
    name: 'groupIds',
    label: 'User Groups',
  },
}

export const onHandleSubmit = (handleOnClose: () => void, onRefetchData: () => void, editingUser?: UserModel) => async (
  params: UpdateUserModel,
) => {
  const { name, groupIds } = params
  const updateUserRes = await updateUser({ name, groupIds }, editingUser?.id || '')

  if (updateUserRes) {
    notification.success({
      message: toastMessages.CHANGES_SAVE_SUCCESS,
    })
    handleOnClose()
    return onRefetchData()
  }

  return notification.error({
    message: updateUserRes.description || toastMessages.FAILED_TO_EDIT_USER,
  })
}

export const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  editingUser,
  setEditingUser,
  onRefetchData,
  orgId,
}) => {
  const handleOnClose = () => setEditingUser(undefined)
  const { name, groupIds } = formFields

  const groupIdQuery = qs.stringify({ id: window.reapit.config.groupIdsWhitelist }, { indices: false })
  const { data } = useSWR<GroupModelPagedResult | undefined>(
    !orgId ? null : `${URLS.USERS_GROUPS}?${groupIdQuery}&pageSize=999&organisationId=${orgId}`,
  )

  const onSubmit = useCallback(onHandleSubmit(handleOnClose, onRefetchData, editingUser), [editingUser])

  if (!data) return <Loader />
  const { _embedded: listUserGroup } = data
  const userGroupOptions = prepareUserGroupOptions(listUserGroup ?? [])

  if (!editingUser) return null

  return (
    <ModalV2
      visible={!!editingUser}
      destroyOnClose={true}
      onClose={handleOnClose}
      title={`Editing ${editingUser.name}`}
      zIndex={90}
    >
      <p className="mb-4">
        <p>Please use the ‘Users Group’ section below to manage which groups this user belongs to:</p>
      </p>
      <Formik
        initialValues={{
          name: editingUser.name || '',
          groupIds: editingUser.groups || [],
        }}
        onSubmit={onSubmit}
      >
        {() => {
          return (
            <Form noValidate={true}>
              <Section hasPadding={false} hasMargin={false}>
                <Input type="text" labelText={name.label} id={name.name} name={name.name} />
                <DropdownSelect
                  mode="multiple"
                  id={groupIds.name}
                  placeholder="Please select"
                  name={groupIds.name}
                  labelText={groupIds.label}
                  options={userGroupOptions}
                  filterOption={true}
                  optionFilterProp="children"
                />
              </Section>
              <ButtonGroup isCentered hasSpacing>
                <Button variant="secondary" disabled={false} onClick={handleOnClose} type="button">
                  Cancel
                </Button>
                <Button variant="primary" loading={false} type="submit">
                  Save
                </Button>
              </ButtonGroup>
            </Form>
          )
        }}
      </Formik>
    </ModalV2>
  )
}

export default UpdateUserModal