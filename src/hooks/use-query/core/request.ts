type NORMAL_DATATYPE = string | number | boolean | null

interface BodyProps<T> {
  [key: string]: NORMAL_DATATYPE | T
}

interface QueryProps {
  [key: string]: string | number
}

export type REQUEST_METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestProps<TBody> {
  token?: string
  method?: REQUEST_METHOD
  baseUrl?: string
  endpoint: string
  body?: BodyProps<TBody>
  query?: QueryProps
}

export function toQueryString(object: QueryProps): string {
  let result = ''

  if (Object.keys(object).length === 0) return result

  result += '?'

  const params = Object.entries(object).reduce(
    (prev, [key, value], index) =>
      `${prev}${index > 0 ? '&' : ''}${key}=${value}`,
    ''
  )

  return (result += params)
}

export async function request<TBody>(props: RequestProps<TBody>) {
  const { method, token, baseUrl, endpoint, query, body } = {
    body: {},
    query: {},
    method: 'GET',
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    token: localStorage.getItem('accessToken') || '',
    ...props,
  }

  const url = baseUrl + endpoint + toQueryString(query)

  // console.log(url)

  const response = await fetch(url, {
    mode: 'cors',
    method,
    headers: {
      ...(token.length > 0
        ? { Authorization: `Bearer ${JSON.parse(token)}` }
        : {}),
    },
    ...(Object.keys(body).length > 0 ? { body: JSON.stringify(body) } : {}),
  })

  if (!response.ok) {
    const message = await response.json().then((resData) => resData.message)
    throw new Error(
      message || 'Something went wrong! Please try again or wait a few minutes.'
    )
  }

  const data = await response.json()

  return data
}