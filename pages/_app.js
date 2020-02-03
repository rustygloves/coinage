import "../styles.css"

import useSWR, { trigger } from "swr"

const API_URL = "./api"

async function fetcher(path, limit) {
  const res = await fetch(API_URL + path + `?limit=${limit}`)
  const json = await res.json()
  return json
}

export default function MyApp({ Component, pageProps }) {
  const [limit, updateLimit] = React.useState(10)
  // Refresh hourly (if you are on the page for that long 🤣)
  const { data, error } = useSWR(["/latest", limit], fetcher, {
    refreshInterval: 36e6
  })

  const updateAndTrigger = l => {
    if (limit !== l) {
      updateLimit(l)
      trigger("/latest")
    }
  }

  return (
    <Component
      {...pageProps}
      data={data}
      error={error}
      update={updateAndTrigger}
      limit={limit}
    />
  )
}
