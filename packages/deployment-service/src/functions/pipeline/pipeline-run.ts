import { findPipelineById } from '@/services'
import { ownership } from '@/utils'
import { resolveDeveloperId } from '../../utils'
import { httpHandler, HttpStatusCode, NotFoundException } from '@homeservenow/serverless-aws-handler'
// import { execSync } from 'child_process'
import { resolve } from 'path'
import { defaultOutputHeaders } from '../../constants'
import fs from 'fs'
import request from 'request'
import AdmZip from 'adm-zip'

const cloneDir = 'project'
const dir = resolve('/tmp', cloneDir)
const cloneZip = 'resource.zip'

const unzip = () => {
  const zip = new AdmZip(`${dir}/${cloneZip}`)
  zip.extractAllTo(`${dir}`, true)
}

export const pipelineRun = httpHandler({
  defaultOutputHeaders,
  defaultStatusCode: HttpStatusCode.OK,
  handler: async ({ event }) => {
    const developerId = await resolveDeveloperId(event)

    const pipeline = await findPipelineById(event.pathParameters?.id as string)

    if (!pipeline) {
      throw new NotFoundException()
    }

    await ownership(pipeline.developerId, developerId)

    if (!pipeline.repository) {
      throw new NotFoundException('No repository set')
    }

    // make sure tmp dir exists
    if (!fs.existsSync(dir)) {
      console.log('making dir')
      fs.mkdirSync(dir)
    } else {
      // TODO delete dir and recreate
    }

    try {
      await new Promise<void>((resolve) => {
        request(`https://codeload.github.com/${pipeline.repository}/zip/refs/heads/master`)
          .pipe(fs.createWriteStream(`${dir}/${cloneZip}`))
          .on('close', function () {
            resolve()
          })
      })

      // console.log(result)
    } catch (e) {
      // console.error(e)
      console.log('message', e.message)
      console.log('clone failed')
      return {
        statusCode: 500,
        headers: defaultOutputHeaders,
      }
    }

    unzip()

    const dirName = `${pipeline.repository.split('/').pop()}-master`

    console.log(fs.existsSync(resolve(dir, dirName)))

    return {
      statusCode: 200,
    }

    // try {
    //   const yarn = execSync('npm i', {
    //     cwd: resolve(dir, cloneDir),
    //   })
    //   console.log('yarn', yarn.toString())
    // } catch (e) {
    //   console.log(e.output.toString())
    //   console.log('yarn errors')
    //   console.error(e)
    //   console.log('npm install failed')
    //   return {
    //     statusCode: 500,
    //     headers: defaultOutputHeaders,
    //   }
    // }

    // try {
    //   const yarn = execSync('npm run build', {
    //     cwd: resolve(dir, cloneDir),
    //   })
    //   console.log('yarn build', yarn.toString())
    // } catch (e) {
    //   console.log('yarn build errors')
    //   console.error(e)
    //   console.log('npm build failed')
    //   return {
    //     statusCode: 500,
    //     headers: defaultOutputHeaders,
    //   }
    // }

    // try {
    //   const serverless = execSync('serverless deploy', {
    //     cwd: resolve(dir, cloneDir),
    //   })
    //   console.log('serverless', serverless.toString())
    // } catch (e) {
    //   console.log('sefverless error')
    //   console.error(e)

    //   return {
    //     statusCode: 500,
    //     headers: defaultOutputHeaders,
    //   }
    // }

    // return {
    //   statusCode: HttpStatusCode.OK,
    //   body: pipeline,
    // }
  },
})
