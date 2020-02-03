import React from "react"
import * as R from "ramda"

import styles from "./marketOverview.module.css"

import { Row } from "./_marketRow"
import { Loader } from "../Loader/loader"

export function MarketOverview({ data = [], loading, error }) {
  const formattedData = data.map(entry =>
    R.mergeRight(
      R.pick(["cmc_rank", "name"], entry),
      R.pick(
        ["price", "percent_change_24h", "market_cap", "volume_24h"],
        entry.quote.USD
      )
    )
  )

  if (error) {
    return <p className={styles.error}>Download Failed</p>
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.table}>
      <div className={`${styles.row} ${styles.thead}`}>
        <div className={`${styles.cell} ${styles.header}`}>Rank</div>
        <div className={`${styles.cell} ${styles.header}`}>Name</div>
        <div className={`${styles.cell} ${styles.header}`}>Price</div>
        <div className={`${styles.cell} ${styles.header}`}>Change (24h)</div>
        <div className={`${styles.cell} ${styles.header}`}>Market Cap</div>
        <div className={`${styles.cell} ${styles.header}`}>Volume (24h)</div>
      </div>
      {formattedData.map(coin => (
        <Row key={coin["cmc_rank"]} data={coin} />
      ))}
    </div>
  )
}
