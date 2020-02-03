import React from "react"

import Head from "next/head"

import { Buttons, Header, MarketOverview } from "../components"

function HomePage({ limit, update, error, data }) {
  return (
    <div>
      <Head>
        <title>coinage | home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Header currentPage="home" />
      <div style={{ padding: "10px 0 20px" }}>
        <Buttons current={limit} update={update} />
        <MarketOverview data={data} loading={!data} error={error} />
      </div>
    </div>
  )
}

export default HomePage
