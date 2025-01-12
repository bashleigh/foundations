import * as React from 'react'
import { ModalProps, Modal } from '@reapit/elements-legacy'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import ConfirmUninstall from './confirm-uninstall'

interface AppInstallationsModalInnerProps {
  appId: string
  appName: string
  onUninstallSuccess: () => void
}

export type AppInstallationsModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & AppInstallationsModalInnerProps

interface HandleAfterClose {
  setUninstallApp: any
  afterClose?: any
}
export const handleAfterClose =
  ({ setUninstallApp, afterClose }: HandleAfterClose) =>
  () => {
    setUninstallApp(undefined)
    if (afterClose) {
      afterClose()
    }
  }

export const handleUninstall =
  (setUninstallApp: (app: InstallationModel) => void) => (app: InstallationModel) => () => {
    setUninstallApp(app)
  }

export const AppInstallationsModal: React.FC<AppInstallationsModalProps> = ({
  appName,
  visible,
  afterClose,
  onUninstallSuccess,
}) => {
  const [uninstallApp, setUninstallApp] = React.useState<InstallationModel>()

  return (
    <Modal visible={visible} afterClose={afterClose} renderChildren>
      <>
        {uninstallApp && (
          <ConfirmUninstall
            appName={appName}
            installationDetail={uninstallApp}
            onUninstallSuccess={onUninstallSuccess}
            afterClose={handleAfterClose({ setUninstallApp, afterClose })}
          />
        )}
      </>
    </Modal>
  )
}

export default AppInstallationsModal
