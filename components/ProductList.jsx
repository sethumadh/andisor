/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react"

import PrimaryList from "../components/PrimaryList"
import MainList from "../components/MainList"

const ProductList = ({ item }) => {
  const [state, setState] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  // const { data, updateData } = useContext(ProductContext)
  const handleStateChange = () => {
    setState(!state)
  }
  const handleEdit = (bool) => {
    setIsEditable(bool)
  }

  return (
    <>
      <MainList
        key={item.id}
        item={item}
        handleStateChange={handleStateChange}
        isEditable={isEditable}
        handleEdit={handleEdit}
      />

      {state &&
        !isEditable &&
        item.primary_variants.length > 0 &&
        item.primary_variants.map((variant, i) => (
          <>
            <PrimaryList key={i} variant={variant} item={item} />
          </>
        ))}
    </>
  )
}

export default ProductList
