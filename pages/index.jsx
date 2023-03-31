import React from "react"

import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import Table from "../components/Table"

const Home = () => {
  const { data } = useContext(ProductContext)
  return (
    <div className=" min-h-screen scroll-smooth overflow-hidden" id="Home">
      <Table data={data} />
    </div>
  )
}
export default Home
