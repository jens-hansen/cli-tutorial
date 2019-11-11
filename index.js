#!/usr/bin/env node
const inquirer = require('inquirer')
const fs = require('fs')
const { parse } = require('@babel/parser')

const { createTestFile } = require('./create-test-file')

const run = async () => {
  const directoryFiles = fs
    .readdirSync(process.cwd())
    .filter(file => file.endsWith('.js') && !file.endsWith('.test.js'))
  const { filename } = await inquirer.prompt({
    type: 'list',
    name: 'filename',
    choices: directoryFiles,
  })
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = parse(content, {
    sourceType: 'module',
  })
  const exports = getExports(ast.program.body)

  const testContent = createTestFile({ imports: exports, filename })
  const testFilename = createTestFilename(filename)
  fs.writeFileSync(testFilename, testContent)
}

run()

function createTestFilename(originalName) {
  const parts = originalName.split('.')
  return parts.slice(0, -1).join('.') + '.test.' + parts[parts.length - 1]
}

function getExports(body) {
  const namedExports = body
    .filter(item => item.type === 'ExportNamedDeclaration')
    .map(item => item.declaration)
    .reduce((total, current) => {
      if (current.id) {
        return [...total, current.id.name]
      } else if (current.declarations) {
        return [
          ...total,
          ...current.declarations.map(declaration => declaration.id.name),
        ]
      }
    }, [])
  return namedExports
}
