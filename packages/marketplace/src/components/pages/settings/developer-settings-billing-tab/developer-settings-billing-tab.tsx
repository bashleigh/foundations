import * as React from 'react'
import { Section } from '@reapit/elements'
import { Tabs } from '../tabs'
import AccountsInformationForm from './accounts-information-form'
import { Redirect } from 'react-router-dom'
import { selectIsAdmin } from '@/selector/auth'
import { useSelector } from 'react-redux'
import Subcriptions from '@/components/ui/developer-settings/billing/subscriptions'

const DevelperSettingsBillingTabPage: React.FC<{}> = () => {
  const isAdmin = useSelector(selectIsAdmin)

  if (!isAdmin) {
    /**
     * This page is only for admin (which is also a developer)
     *
     * Can't set allow in PrivateRoute component to "ADMIN" because
     * It would change to loginType = 'ADMIN' which set the navbar to admin navbar
     *
     * https://github.com/reapit/foundations/issues/1340
     * Requirement is this page should be used on developer portal and developer navbar.
     * TODO: refactor the the private router or this after the release?
     */
    return <Redirect to="/404" />
  }

  return (
    <>
      <Section>
        <Tabs />
        <AccountsInformationForm />
      </Section>
      <Section>
        <Subcriptions />
      </Section>
    </>
  )
}

export default DevelperSettingsBillingTabPage
