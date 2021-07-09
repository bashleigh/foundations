import { ForbiddenException, httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { PipelineEntity } from './../../entities'
import * as pipelineService from './../../services/pipeline'
import * as service from './../../services/pipeline-runner'
import { resolveDeveloperId } from './../../utils'
import { Pagination } from 'nestjs-typeorm-paginate'

/**
 * Return pagination response for signed in user
 */
export const pipelineRunnerPaginate = httpHandler({
  defaultOutputHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  handler: async ({ event }): Promise<Pagination<PipelineEntity>> => {
    const developerId = await resolveDeveloperId(event)

    const pipeline = await pipelineService.findPipelineById(event.pathParameters?.pipelineId as string)

    if (!pipeline) {
      throw new NotFoundException()
    }

    if (pipeline.developerId !== developerId) {
      throw new ForbiddenException()
    }

    return service.paginatePipelineRunners(
      pipeline.id as string,
      event?.queryStringParameters?.page ? Number(event?.queryStringParameters?.page) : undefined,
    )
  },
})