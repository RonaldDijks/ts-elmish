import { Runtime } from '../src/ts-elmish'

new Runtime({
  init: [0],
  update: (message, state) => {
    return [state + 1]
  },
  view: (state, dispatch) => {
    const keepCounting = window.confirm(`Count is ${state}. Increment?`)
    if (keepCounting) {
      dispatch({})
    }
  }
})
