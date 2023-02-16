import students from '~/api/students'

export function useApi() {
  const api = {
    students,
  }
  return { api }
}
