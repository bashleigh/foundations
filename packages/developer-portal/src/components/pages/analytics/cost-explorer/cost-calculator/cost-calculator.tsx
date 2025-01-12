import * as React from 'react'
import { H5, GridItem, Grid, Section } from '@reapit/elements-legacy'
import CostCalculatorForm, { CostCalculatorFormValues } from './cost-calculator-form'
import TotalCostTable from './total-cost-table'
import FadeIn from '../../../../../styles/fade-in'
import developerEditionPricing from '@/assets/files/foundation-pricing-2021.pdf'

export type CostCalculatorProps = {}

export const prepareInitialValues = (endpointsUsed: string, apiCalls: string) => {
  return () => {
    return {
      endpointsUsed,
      apiCalls,
    } as CostCalculatorFormValues
  }
}

export const handleOnSubmit = (
  setEndpointsUsed: (endpointsUsed: string) => void,
  setApiCalls: (apiCalls: string) => void,
) => {
  return (values: CostCalculatorFormValues) => {
    const { endpointsUsed, apiCalls } = values
    setEndpointsUsed(endpointsUsed)
    setApiCalls(apiCalls)
  }
}

export const handleOnClear = (
  setEndpointsUsed: (endpointsUsed: string) => void,
  setApiCalls: (apiCalls: string) => void,
) => {
  return () => {
    setEndpointsUsed('')
    setApiCalls('')
  }
}

const CostCalculator: React.FC<CostCalculatorProps> = () => {
  const [endpointsUsed, setEndpointsUsed] = React.useState('')
  const [apiCalls, setApiCalls] = React.useState('')
  const formValues = React.useMemo(prepareInitialValues(endpointsUsed, apiCalls), [endpointsUsed, apiCalls])
  const onSubmit = React.useCallback(handleOnSubmit(setEndpointsUsed, setApiCalls), [])
  const onClear = React.useCallback(handleOnClear(setEndpointsUsed, setApiCalls), [])

  return (
    <Section hasBoxShadow>
      <H5>API Cost Calculator</H5>
      <FadeIn>
        <Grid>
          <GridItem className="is-half-desktop">
            <p>
              You can calculate the estimated monthly cost below using our Cost Calculator. Just select the number of
              endpoints and enter the amount of API calls below. To see the full Foundations Pricing, please click{' '}
              <a href={developerEditionPricing} target="_blank" rel="noopener noreferrer">
                here
              </a>
            </p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem className="is-half-desktop">
            <CostCalculatorForm initialValues={formValues} onSubmit={onSubmit} onClear={onClear} />
          </GridItem>
        </Grid>
        <TotalCostTable formValues={formValues} />
      </FadeIn>
    </Section>
  )
}

export default CostCalculator
