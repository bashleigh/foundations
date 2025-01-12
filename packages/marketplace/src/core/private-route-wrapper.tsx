import * as React from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import Menu from '@/components/ui/menu'
import { Section, AppNavContainer, FlexContainerBasic } from '@reapit/elements-legacy'
import { Redirect, useLocation } from 'react-router'
import Routes from '@/constants/routes'
import { selectDeveloperId, selectIsAdmin } from '../selector/auth'
import { Loader } from '@reapit/elements'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
  path?: string
  showMenu?: boolean
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  showMenu = true,
}) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`
  const isRoot = connectInternalRedirect === '/?' || connectInternalRedirect === '/' || window.location.pathname === '/'
  const isDeveloperEdition = Boolean(selectDeveloperId(connectSession))
  const isDesktopAdmin = selectIsAdmin(connectSession)
  const isAdmin = isDesktopAdmin || isDeveloperEdition
  const hasOwnContainer =
    window.location.pathname?.includes('/settings') || window.location.pathname?.includes('/apps/')

  if (!connectSession) {
    return (
      <AppNavContainer>
        <FlexContainerBasic hasBackground hasPadding>
          <Loader label="Loading" fullPage />
        </FlexContainerBasic>
      </AppNavContainer>
    )
  }

  if (isRoot || (location.pathname.includes(Routes.MY_APPS) && !isAdmin)) {
    return <Redirect to={Routes.APPS} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <AppNavContainer>
      {showMenu && <Menu />}
      <FlexContainerBasic
        id="app-root-container"
        flexColumn
        hasBackground={!hasOwnContainer}
        hasPadding={!hasOwnContainer}
        isScrollable
      >
        <Suspense
          fallback={
            <Section>
              <Loader label="Loading" fullPage />
            </Section>
          }
        >
          {children}
        </Suspense>
      </FlexContainerBasic>
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
