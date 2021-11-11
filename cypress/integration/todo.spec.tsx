import { mount } from '@cypress/react'
import Title from '../../pages/components/Title'

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')
    // mount(<Title title="hello world!"/>)
  })

})
