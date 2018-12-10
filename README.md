# ts-elmish

> The Elm architecture for TypeScript.

A lightweight general purpose Elm-like runtime for TypeScript, based off of raj.

```sh
yarn add ts-elmish
```

## Example

A counter that increments by one every thimne the user confirms.

```ts
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
```

_Note:_ ts-elmish is view layer agnostic.
Here we use the browser's built-in view to play the part.
