const initSate = {
  status: 'Stopped',
  v1: 0,
  v2: 0
}

export default function race(state = initSate, action) {
  switch (action.type) {
    case 'START':
      return Object.assign({}, state, {status: 'Running'})

    case 'STOP':
      return Object.assign({}, state, {status: 'Stopped'})

    case 'RESET':
      return initSate

    case 'TICK_V1':
      return Object.assign({}, state, {v1: state.v1 + action.plus})

    case 'TICK_V2':
      return Object.assign({}, state, {v2: state.v2 + action.plus})

		case 'V1_WIN':
			return Object.assign({}, state, {msg: 'V1 WIN'})

		case 'V2_WIN':
			return Object.assign({}, state, {msg: 'V2 WIN'})

    default:
      return state
  }
}