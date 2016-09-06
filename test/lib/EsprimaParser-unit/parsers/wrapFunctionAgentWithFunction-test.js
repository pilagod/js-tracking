describe('wrapFunctionAgentWithFunction tests', () => {
  const functionAgent = {}
  const calledArguments = [1, 2, 3, 4]
  const builtInArguments = {
    arguments: (function () {
      return arguments
    })(...calledArguments)
  }
  // stub results
  const parseFunctionAgentStub = 'resultFromParseFunctionAgent'

  beforeEach(() => {
    sandbox.stub(esprimaParser, 'parseFunctionAgent')
      .returns(parseFunctionAgentStub)
  })

  afterEach(() => {
    delete builtInArguments.this
  })

  it('should return a function', () => {
    const wrappedFunctionAgent =
      esprimaParser.wrapFunctionAgentWithFunction(functionAgent)

    expect(wrappedFunctionAgent).to.be.instanceof(Function)
  })

  it('should return a function call parseFunctionAgent with functionAgent, builtInArguments and calledArguments and return (basic call test)', () => {
    const wrappedFunctionAgent =
      esprimaParser.wrapFunctionAgentWithFunction(functionAgent)

    builtInArguments.this = undefined

    const result = wrappedFunctionAgent(...calledArguments)

    expect(
      esprimaParser.parseFunctionAgent
        .calledWithExactly(functionAgent, builtInArguments, calledArguments)
    ).to.be.true
    expect(result).to.be.equal(parseFunctionAgentStub)
  })

  it('should return a function call parseFunctionAgent with functionAgent, builtInArguments and calledArguments and return (bind test)', () => {
    const contextStub = {}
    const wrappedFunctionAgent =
      esprimaParser.wrapFunctionAgentWithFunction(functionAgent)

    builtInArguments.this = contextStub

    const result = wrappedFunctionAgent.bind(contextStub)(...calledArguments)

    expect(
      esprimaParser.parseFunctionAgent
        .calledWithExactly(functionAgent, builtInArguments, calledArguments)
    ).to.be.true
    expect(result).to.be.equal(parseFunctionAgentStub)
  })

  it('should return a function call parseFunctionAgent with functionAgent, builtInArguments and calledArguments and return (call test)', () => {
    const contextStub = {}
    const wrappedFunctionAgent =
      esprimaParser.wrapFunctionAgentWithFunction(functionAgent)

    builtInArguments.this = contextStub

    const result = wrappedFunctionAgent.call(contextStub, ...calledArguments)

    expect(
      esprimaParser.parseFunctionAgent
        .calledWithExactly(functionAgent, builtInArguments, calledArguments)
    ).to.be.true
    expect(result).to.be.equal(parseFunctionAgentStub)
  })

  it('should return a function call parseFunctionAgent with functionAgent, builtInArguments and calledArguments and return (apply test)', () => {
    const contextStub = {}
    const wrappedFunctionAgent =
      esprimaParser.wrapFunctionAgentWithFunction(functionAgent)

    builtInArguments.this = contextStub

    const result = wrappedFunctionAgent.apply(contextStub, calledArguments)

    expect(
      esprimaParser.parseFunctionAgent
        .calledWithExactly(functionAgent, builtInArguments, calledArguments)
    ).to.be.true
    expect(result).to.be.equal(parseFunctionAgentStub)
  })
})
