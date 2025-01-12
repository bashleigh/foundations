import { SSM } from 'aws-sdk'
import { CLIENT_KEY_PREFIX } from '../constants/ssm'

const ssm = new SSM()

export const fetchConfigValue = async (key: string) => {
  try {
    const params = {
      Name: `${CLIENT_KEY_PREFIX}${key}`,
      WithDecryption: true,
    }
    const request = await ssm.getParameter(params).promise()
    return request.Parameter.Value
  } catch (error) {
    throw new Error(`Failed to fetch parameter ${error.message}`)
  }
}
