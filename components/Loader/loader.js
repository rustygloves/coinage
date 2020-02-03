import React from "react"

import lottie from "lottie-web"

import styles from "./loader.module.css"

export function Loader() {
  React.useEffect(() => {
    const element = document.getElementById("lottie")
    lottie.loadAnimation({
      container: element,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/coin.json"
    })
  }, [])

  return <div id="lottie" className={styles.lottieHolder} />
}
