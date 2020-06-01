import 'isomorphic-fetch'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routers from './routers'
import { Context, APIGatewayProxyEvent } from 'aws-lambda'
import serverless from 'serverless-http'
import { errorHandler } from '../../../common/utils/error-handler'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routers)
app.use((err: Error, _req: Request, res: Response) => {
  errorHandler(err, res)
})

const expressApp = serverless(app)

export const parseHeadersFromEvent = (event: APIGatewayProxyEvent) => {
  const authorization = event?.requestContext?.authorizer?.authorization?.trim()
  const newHeaders = {
    ...event.headers,
    ...event?.requestContext?.authorizer,
    authorization: `Bearer ${authorization}`,
  } as { [name: string]: string }
  return newHeaders
}

export const appointmentPlannerHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('appointmentPlannerHandler', { event, context })
  const newHeaders = parseHeadersFromEvent(event)
  event.headers = newHeaders
  console.log('appointmentPlannerHandler', { newHeaders })
  return expressApp(event, context)
}