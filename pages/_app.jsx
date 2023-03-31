import "../styles/globals.css"
import React from "react"

import { ProductContextProvider } from "../context/ProductContext"
import Navbar from "../components/Navbar"

export default function App({ Component, pageProps }) {
  return (
    <>
      <ProductContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </ProductContextProvider>
    </>
  )
}
