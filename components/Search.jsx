import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

const Search = () => {
  const [term, setTerm] = useState("")
  const [debounceTerm, setDebounceTerm] = useState("")
  // const [searchCleanUp, setSearchCleanUp]= useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerm(debounceTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [debounceTerm])
  useEffect(() => {
    if (term?.trim().length != 0) {
      router.push(`/search?query=${term}`)
    } else {
      if (router.pathname === "/search") router.push("/search")
    }
  }, [term])

  return (
    <>
      <div className="relative">
        <input
          className="my-4 w-80 h-12 px-4 border border-gray-500 rounded-lg block cursor-pointer"
          type="text"
          placeholder="Search all orders"
          onChange={(e) => {
            setDebounceTerm(e.target.value)
          }}
          value={debounceTerm}
          name="search"
        />
      </div>
    </>
  )
}
export default Search
