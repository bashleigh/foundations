import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { Checkbox, CheckboxProps } from '../index'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'

const props: CheckboxProps = {
  id: 'test',
  name: 'test',
  labelText: 'Test checkbox'
}

describe('Checkbox', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Checkbox {...props} />))).toMatchSnapshot()
  })

  it('should work when integrating with Formik', () => {
    const wrapper = mount(
      <Formik
        initialValues={{ test: false }}
        onSubmit={jest.fn()}
        render={() => (
          <Form>
            <Checkbox {...props} />
          </Form>
        )}
      />
    )
    expect(wrapper.find('label')).toHaveLength(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
