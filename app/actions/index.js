function action(type, payload = {}) {
  return {type, ...payload}
}

export const start = () => action('START')
export const reset = () => action('RESET')
