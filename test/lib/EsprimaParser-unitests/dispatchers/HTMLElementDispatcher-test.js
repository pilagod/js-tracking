const importAllFrom = require('import-all-from')

describe('HTMLElementDispatcher tests', () => {
  let HTMLElementDispatcher, workDir

  before(() => {
    workDir = `${libDir}/dispatchers/HTMLElementDispatcher`
    HTMLElementDispatcher = require(`${workDir}`)
  })

  it('should import all other handlers in /HTMLElementDispatcher', () => {
    const path = `${__dirname}/${workDir}`
    const handlers = importAllFrom(path, {file: false})

    expect(HTMLElementDispatcher.handlers).to.be.eql(handlers)
  })

  it('should return false when test called with data whose context has no HTMLElement', () => {
    const data = {
      context: {}
    }
    const result = HTMLElementDispatcher.test(data)

    expect(result).to.be.false
  })

  it('should return false when test called with data whose context has HTMLElement but caller is not instanceof context.HTMLElement', () => {
    const HTMLElement = function () {}
    const data = {
      context: {HTMLElement},
      caller: {}
    }
    const result = HTMLElementDispatcher.test(data)

    expect(result).to.be.false
  })

  it('should return true when test called with data whose context has HTMLElement and caller is instanceof context.HTMLElement', () => {
    const HTMLElement = function () {}
    const data = {
      context: {HTMLElement},
      caller: new HTMLElement()
    }
    const result = HTMLElementDispatcher.test(data)

    expect(result).to.be.true
  })
})