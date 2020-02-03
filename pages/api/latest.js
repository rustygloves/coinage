import fetch from "isomorphic-unfetch"

export default (req, res) => {
  const {
    query: { limit }
  } = req
  console.log(process.env.CMC_API_KEY)
  fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest" +
      `?start=1&limit=${limit || 100}&convert=USD`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY
      }
    }
  )
    .then(r => r.json())
    .then(({ data }) => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).send("Error:", err.message)
    })
}
