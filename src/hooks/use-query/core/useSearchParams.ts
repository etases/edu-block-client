import { useEffect } from 'react'
import { useSearchParams as useRRSearchParams } from 'react-router-dom'

interface ParamsInterface {
  [key: string]: string
}

export function useSearchParams(
  props?: ParamsInterface
): [ParamsInterface, (params: ParamsInterface) => void] {
  const [searchParams, setSearchParams] = useRRSearchParams()
  const searchParamsAsObject = Object.fromEntries(searchParams.entries())
  function setSearchParamsFromObject(params: ParamsInterface) {
    setSearchParams({
      ...Object.keys(searchParamsAsObject).reduce(
        (acc, key) => ({
          ...acc,
          ...(searchParamsAsObject[key]
            ? { [key]: searchParamsAsObject[key] }
            : {}),
        }),
        {}
      ),
      ...params,
    })
  }

  useEffect(() => {
    setSearchParamsFromObject(
      Object.keys(props || {}).reduce(
        (acc, key) => ({
          ...acc,
          ...(props?.[key]
            ? { [key]: searchParamsAsObject[key] || props[key] }
            : {}),
        }),
        searchParamsAsObject
      )
    )
  }, [])
  return [searchParamsAsObject, setSearchParamsFromObject]
}
