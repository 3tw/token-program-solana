import { message } from '~/api/message'

export function useApi() {
  const api = {
    message,
  }
  return { api }
}
