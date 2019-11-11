module.exports = {
  createTestFile: ({ filename, imports }) => {
    return `/* eslint-env jest */
import { ${imports.join(', ')} } from './${filename}'

describe('${filename}', () => {
    ${imports
      .map(i => {
        return `test('${i}', () => {
        expect(true).toBeTruthy()
    })`
      })
      .join('\r\n \r\n \t')}
}) 
`
  },
}
