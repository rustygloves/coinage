import React from "react"

import { ResponsiveScatterPlot } from "@nivo/scatterplot"

import { Loader } from "../Loader/loader"

import styles from "./liquidityChart.module.css"

const BILLION = 1e9
const MILLION = 1e6

function minMax(items, key) {
  return items.reduce((acc, val) => {
    const value = Math.abs(val.data[0][key])
    acc[0] = acc[0] === undefined || value < acc[0] ? value : acc[0]
    acc[1] = acc[1] === undefined || value > acc[1] ? value : acc[1]
    return acc
  }, [])
}

export function LiquidityChart({ data = [], error, loading, showLegend }) {
  if (error) {
    return <p className={styles.error}>Download Failed</p>
  }

  if (loading) {
    return <Loader />
  }

  const formattedData = data.map(entry => {
    const volume = entry["quote"]["USD"]["volume_24h"],
      cap = entry["quote"]["USD"]["market_cap"]
    return {
      id: entry["name"],
      data: [
        {
          x: volume / BILLION,
          xLabel:
            volume > BILLION
              ? `${Math.round((volume / BILLION) * 10) / 10} Billion`
              : `${Math.round(volume / MILLION)} Million`,
          y: cap / BILLION,
          yLabel:
            cap > BILLION
              ? `${Math.round((cap / BILLION) * 10) / 10} Billion`
              : `${Math.round(cap / MILLION)} Million`,
          z: Math.abs(
            Math.round(entry["quote"]["USD"]["percent_change_24h"] * 100) / 100
          ),
          zLabel:
            Math.round(entry["quote"]["USD"]["percent_change_24h"] * 100) / 100
        }
      ]
    }
  })

  const minMaxX = minMax(formattedData, "x")
  const minMaxY = minMax(formattedData, "y")
  const minMaxZ = minMax(formattedData, "z")

  console.log({ data, formattedData, minMaxX, minMaxY, minMaxZ })

  return (
    <div style={{ height: "70vh" }}>
      <ResponsiveScatterPlot
        data={formattedData}
        margin={{ top: 40, right: showLegend ? 140 : 40, bottom: 70, left: 60 }}
        xScale={{ type: "linear", min: minMaxX[0], max: minMaxX[1] + 5 }}
        xFormat={function(e) {
          return `$ ${e}`
        }}
        yScale={{ type: "linear", min: minMaxY[0], max: minMaxY[1] + 5 }}
        yFormat={function(e) {
          return `$ ${e}`
        }}
        nodeSize={{
          key: "z",
          values: [minMaxZ[0], minMaxZ[1]],
          sizes: [10, 30]
        }}
        blendMode="multiply"
        colors={{ scheme: "dark2" }}
        tooltip={({ node }) => (
          <div
            style={{
              color: node.style.color,
              background: "rgba(0,0,0,0.85)",
              padding: "12px 16px"
            }}
          >
            <strong>{node.data.serieId}</strong>
            <br />
            {`Volume Change (24h): ${node.data.xLabel}`}
            <br />
            {`Market Cap: ${node.data.yLabel}`}
            <br />
            {`Price Change (24h): ${node.data.zLabel}%`}
          </div>
        )}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Volume Change (24h), Billion (USD)",
          legendPosition: "middle",
          legendOffset: 46
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Market Cap, Billion (USD)",
          legendPosition: "middle",
          legendOffset: -40
        }}
        legends={
          showLegend
            ? [
                {
                  anchor: "top-right",
                  direction: "column",
                  justify: false,
                  translateX: 130,
                  translateY: 0,
                  itemWidth: 100,
                  itemHeight: 12,
                  itemsSpacing: 5,
                  itemDirection: "left-to-right",
                  symbolSize: 12,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]
            : []
        }
      />
    </div>
  )
}
