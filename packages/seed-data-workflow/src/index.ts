// Not ideal but ts-node doesn't like the paths alias provided so doesn't find the src directory of connect-session
import { ReapitConnectServerSession } from '../../connect-session/src'
import config from '../config.json'
import { appointmentsCreate } from './entities/appointments-create'

const { connectClientId, connectClientSecret, connectOAuthUrl } = config

const reapitConnectSession = new ReapitConnectServerSession({
  connectClientId,
  connectClientSecret,
  connectOAuthUrl,
})

;(async () => {
  try {
    const accessToken = await reapitConnectSession.connectAccessToken()
    if (!accessToken) throw new Error('Not authenticated')
    await appointmentsCreate(accessToken)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
