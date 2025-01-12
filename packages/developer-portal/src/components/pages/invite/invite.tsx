import React from 'react'
import { ModalV2, Formik, Input, Form, Content, Button } from '@reapit/elements-legacy'
import { getParamsFromPath } from '@/utils/client-url-params'
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectInviteMemberStatus } from '@/selector/developers'
import { acceptInviteMember, rejectInviteMember } from '@/actions/developers'
import AcceptedModal from './accepted'
import RejectedModal from './rejected'
import { InviteMemberStatus } from '@/reducers/developers/member-details'
import { Dispatch } from 'redux'

export const handleSubmit = (dispatch: Dispatch, developerId: string, memberId: string) => (values) => {
  const params = {
    developerId,
    memberId,
    ...values,
  }
  dispatch(acceptInviteMember(params))
}

export const handleReject = (dispatch: Dispatch, developerId: string, memberId: string) => () => {
  const params = {
    developerId,
    memberId,
  }
  dispatch(rejectInviteMember(params))
}

export interface ModalFooterProps {
  onConfirm: () => void
  onReject: () => void
  inviteStatus: InviteMemberStatus
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ onConfirm, onReject, inviteStatus }) => {
  const isDisabled = inviteStatus == 'REJECTING' || inviteStatus == 'ACCEPTING'
  return (
    <>
      <Button
        className="mr-2"
        loading={inviteStatus === 'REJECTING'}
        disabled={isDisabled}
        key="close"
        type="button"
        variant="danger"
        onClick={onReject}
      >
        Decline
      </Button>
      <Button
        variant="primary"
        loading={inviteStatus === 'ACCEPTING'}
        disabled={isDisabled}
        key="submit"
        type="submit"
        onClick={onConfirm}
      >
        Confirm
      </Button>
    </>
  )
}

export const Invite: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const queryParams = getParamsFromPath(location.search)
  const { developerId, memberId, memberName: name, memberJobTitle: jobTitle, organisationName: company } = queryParams

  const inviteStatus = useSelector(selectInviteMemberStatus)

  const onSubmit = handleSubmit(dispatch, developerId, memberId)
  const onReject = handleReject(dispatch, developerId, memberId)

  const isFormVisible = ['PENDING', 'ACCEPTING', 'REJECTING', 'ERROR'].includes(inviteStatus)

  return (
    <>
      {isFormVisible && (
        <Formik initialValues={{ name, jobTitle }} onSubmit={onSubmit}>
          {({ handleSubmit }) => {
            return (
              <ModalV2
                title="Reapit Foundations Invitation"
                visible
                isCentered
                closable={false}
                footer={<ModalFooter onConfirm={handleSubmit} onReject={onReject} inviteStatus={inviteStatus} />}
              >
                <Content>
                  <p>You have been invited to join the &apos;{company}&apos; organisation on Reapit Foundations.</p>
                  <p>Before confirming your account, please ensure your details are correct below.</p>
                </Content>
                <Form>
                  <Input type="text" name="name" id="name" required labelText="Name"></Input>
                  <Input type="text" name="jobTitle" id="jobTitle" required labelText="Job Title"></Input>
                </Form>
                <Content>
                  <p>
                    <strong>Important: </strong>If you already have an account and confirm this invitation, any data on
                    your existing account will no longer be available.
                  </p>
                </Content>
              </ModalV2>
            )
          }}
        </Formik>
      )}
      <AcceptedModal visible={inviteStatus === 'ACCEPTED'} />
      <RejectedModal visible={inviteStatus === 'REJECTED'} />
    </>
  )
}

export default Invite
