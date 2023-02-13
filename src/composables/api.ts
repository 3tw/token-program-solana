import { messages } from '~/api/messages'

export function useApi() {
  const api = {
    messages,
  }
  return { api }
}
