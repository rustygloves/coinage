import React from "react"

import styles from "./buttons.module.css"

export function Buttons({ current, update, showLegend, toggleShowLegend }) {
  return (
    <div
      className={`${styles.buttonRow} ${toggleShowLegend && styles.withLegend}`}
    >
      {toggleShowLegend ? (
        <button className={styles.button} onClick={toggleShowLegend}>
          {showLegend ? "Hide Legend" : "Show Legend"}
        </button>
      ) : null}
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${current === 10 && styles.active}`}
          onClick={() => update(10)}
        >
          10
        </button>
        <button
          className={`${styles.button} ${current === 50 && styles.active}`}
          onClick={() => update(50)}
        >
          50
        </button>
        <button
          className={`${styles.button} ${current === 100 && styles.active}`}
          onClick={() => update(100)}
        >
          100
        </button>
      </div>
    </div>
  )
}
