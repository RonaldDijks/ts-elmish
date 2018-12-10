export type Effect<Msg> = (dispatch: Dispatch<Msg>) => void

export type Update<State, Msg> = (msg: Msg, state: State) => StateChange<State, Msg>

export type Dispatch<Msg> = (msg: Msg) => void

export type View<State, Msg, Output = any> = (state: State, dispatch: Dispatch<Msg>) => Output

export type Done<State> = (state: State) => void

export type StateChange<State, Msg> = [State, Effect<Msg>?]

export interface Program<State, Msg, Output = any> {
  update: Update<State, Msg>
  view: View<State, Msg, Output>
  done?: Done<State>
  init: StateChange<State, Msg>
}

export const mkProgram = <State, Msg, Output = any>(
  init: StateChange<State, Msg>,
  update: Update<State, Msg>,
  view: View<State, Msg, Output>,
  done?: Done<State>
): Program<State, Msg, Output> => ({
  init,
  update,
  view,
  done
})

type RuntimeState<State> =
  | { kind: 'not-running' }
  | { kind: 'running'; value: State }
  | { kind: 'done'; value: State }

export class Runtime<State, Msg> {
  update: Update<State, Msg>
  view: View<State, Msg>
  done?: Done<State> | undefined
  state: RuntimeState<State>

  constructor(program: Program<State, Msg>) {
    this.update = program.update
    this.view = program.view
    this.done = program.done
    this.state = { kind: 'not-running' }
    this.change(program.init)
  }

  public dispatch(msg: Msg) {
    if (this.state.kind === 'running') {
      this.change(this.update(msg, this.state.value))
    }
  }

  private change([state, effect]: StateChange<State, Msg>) {
    if (this.state.kind === 'running') {
      this.state.value = state
      if (effect) {
        effect(this.dispatch)
      }
      this.view(state, this.dispatch)
    }
  }

  public end() {
    if (this.state.kind === 'running') {
      this.state = { kind: 'done', value: this.state.value }
      if (this.done) {
        this.done(this.state.value)
      }
    }
  }
}
