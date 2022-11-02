import { ENDPOINT } from '@constants'
import { request } from '@hooks/use-query/core'
import { useQuery } from '@tanstack/react-query'

export const HELLO_QUERY_KEY = { hello: 'Hello' }

export function useHelloQuery() {
  const helloQuery = useQuery({
    queryKey: [ENDPOINT.MISC.HELLO, HELLO_QUERY_KEY],
    queryFn: async function ({ queryKey }) {
      const [_key, { hello }] = [
        ENDPOINT.MISC.HELLO,
        queryKey[1] as typeof HELLO_QUERY_KEY,
      ]

      return await request({ endpoint: ENDPOINT.MISC.HELLO })
    },
    onSuccess(data) {
      // console.log('Hello response: ')
    },
  })

  return helloQuery
}
