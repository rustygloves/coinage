import React from "react"

import styles from "./marketOverview.module.css"

export function Row({ data = [] }) {
  let percentChange = Math.round(data["percent_change_24h"] * 100) / 100
  return (
    <div className={styles.row} key={data["cmc_rank"]}>
      <div className={styles.cell}>{data["cmc_rank"]}</div>
      <div className={`${styles.cell} ${styles.bold}`}>{data["name"]}</div>
      <div className={`${styles.cell} ${styles.bold}`}>
        ${Math.round(data["price"] * 100) / 100}
      </div>
      <div
        className={`${styles.cell} ${styles.bold} ${
          percentChange < 0 ? styles.red : styles.green
        }`}
      >
        {(percentChange > 0 ? "+" : "") + percentChange}%
      </div>
      <div className={styles.cell}>
        ${Math.round(data["market_cap"]).toLocaleString()}
      </div>
      <div className={styles.cell}>
        ${Math.round(data["volume_24h"]).toLocaleString()}
      </div>
    </div>
  )
}
