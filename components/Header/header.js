import React from "react"
import Link from "next/link"

import styles from "./header.module.css"

export function Header({ currentPage }) {
  return (
    <div type="button" className={styles.header}>
      <h1>coinage</h1>
      <ul>
        <li>
          <Link href="/">
            <a className={currentPage === "home" ? styles.active : null}>
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="/liquidity">
            <a className={currentPage === "liquidity" ? styles.active : null}>
              Liquidity
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
