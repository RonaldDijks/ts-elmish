import { Runtime, mkProgram } from '../src/ts-elmish'

/**
 * Dummy test
 */
describe('Runtime test', () => {
  it('Runtime is instantiable', () => {
    expect(new Runtime(mkProgram([0], (x, s) => [s], () => {}))).toBeInstanceOf(Runtime)
  })
})
