import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useContext } from "react"

import { ProductContext } from "../context/ProductContext"
import Table from "../components/Table"

const Search = () => {
  const { data } = useContext(ProductContext)
  const [searchresults, setSearchresults] = useState([])
  const router = useRouter()
  const { query } = router
  const term = query.query
  console.log(searchresults)

  // if (term && data.length > 0) {
  //   const results = data.filter((item) =>
  //     item?.title?.toLowerCase().includes(term)
  //   )
  //   setSearchresults(results)
  // }

  useEffect(() => {
    if (term) {
      const results = data.filter((item) =>
        item?.title?.toLowerCase().includes(term)
      )
      console.log(results)
      setSearchresults(results)
    } else {
      setSearchresults(data)
    }
  }, [term, data])
  return (
    <div className="mt-16">
      <Table data={searchresults} />
    </div>
  )
}

export default Search
