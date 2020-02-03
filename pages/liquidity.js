import React from "react"

import Head from "next/head"

import { Buttons, Header, LiquidityChart } from "../components"

function LiquidityPage({ limit, update, error, data }) {
  const [showLegend, updateShowLegend] = React.useState(false)
  const toggleShowLegend = () => updateShowLegend(!showLegend)
  return (
    <div>
      <Head>
        <title>coinage | liquidity</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Header currentPage="liquidity" />

      <div style={{ padding: "10px 0" }}>
        <Buttons
          current={limit}
          update={update}
          showLegend={showLegend}
          toggleShowLegend={toggleShowLegend}
        />
        <LiquidityChart
          data={data}
          loading={!data}
          error={error}
          showLegend={showLegend}
        />
      </div>
    </div>
  )
}

export default LiquidityPage
