import tokens from '~/api/tokens'

export function useApi() {
  const api = {
    tokens,
  }
  return { api }
}
