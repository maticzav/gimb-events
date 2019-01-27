import fs from 'fs'
import path from 'path'
import React from 'react'
import renderer from 'react-test-renderer'

describe('Loads pages', () => {
  const pagesPath = path.resolve(__dirname, '../pages')

  for (const pagePath of fs.readdirSync(pagesPath)) {
    it(`should build ${pagePath}`, async () => {
      const App = require(pagePath)
      const component = renderer.create(<App />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  }
})
