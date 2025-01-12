import * as React from 'react'
import Routes from '@/constants/routes'
import { Tabs as ElementsTabs, TabConfig } from '@reapit/elements-legacy'
import { useHistory, useRouteMatch } from 'react-router-dom'

export type TabConfigsProps = {
  currentUrl: string
  history: any
  role?: string
}

export const tabConfigs = ({ currentUrl, history, role }: TabConfigsProps): TabConfig[] => {
  const tabs = [
    {
      tabIdentifier: Routes.SETTINGS_PROFILE_TAB,
      displayText: 'Profile',
      onTabClick: () => {
        history.push(Routes.SETTINGS_PROFILE_TAB)
      },
      active: currentUrl === Routes.SETTINGS_PROFILE_TAB,
    },
  ]

  if (role === 'admin') {
    // Use splice to make sure ORGANISATION_TAB is second tab
    tabs.push({
      tabIdentifier: Routes.SETTINGS_ORGANISATION_TAB,
      displayText: 'Organisation',
      onTabClick: () => {
        history.push(Routes.SETTINGS_ORGANISATION_TAB)
      },
      active: currentUrl === Routes.SETTINGS_ORGANISATION_TAB,
    })
  }
  if (role === 'admin') {
    tabs.push({
      tabIdentifier: Routes.SETTINGS_BILLING_TAB,
      displayText: 'Billing',
      onTabClick: () => {
        history.push(Routes.SETTINGS_BILLING_TAB)
      },
      active: currentUrl === Routes.SETTINGS_BILLING_TAB,
    })
  }
  return tabs
}

export type TabsProps = {
  role?: string
}

export const Tabs: React.FC<TabsProps> = ({ role }) => {
  const history = useHistory()
  const match = useRouteMatch()
  return <ElementsTabs tabConfigs={tabConfigs({ currentUrl: match.url, history, role })} />
}
