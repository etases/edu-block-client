interface BodyInterface {
  [key: string | number]: any
}

interface QueryInterface {
  [key: string]: string
}

interface RequestProps {
  token?: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  baseUrl?: string
  endpoint: string
  body?: BodyInterface
  query?: QueryInterface
}

function toQueryString(object: QueryInterface): string {
  let result = ''

  if (Object.keys(object).length === 0) return result

  result += '?'

  const params = Object.entries(object).reduce(
    (prev, [key, value], index) =>
      `${prev}
      ${index > 0 ? '&' : ''}
      ${key}=${value}`,
    ''
  )

  return (result += params)
}

export async function request(props: RequestProps) {
  const { method, token, baseUrl, endpoint, query, body }: RequestProps = {
    body: {},
    query: {},
    method: 'GET',
    baseUrl: '',
    token: '',
    ...props,
  }

  const url = baseUrl + endpoint + toQueryString(query)

  return await fetch(url, {
    credentials: 'include',
    method,
    headers: {
      ...(token.length > 0 ? { Authorization: token } : {}),
    },
    ...(Object.keys(body).length > 0 ? { body: JSON.stringify(body) } : {}),
  })
}
