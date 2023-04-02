/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext } from "react"

import { ProductContext } from "../context/ProductContext"
import PrimaryList from "../components/PrimaryList"
import MainList from "../components/MainList"

const ProductList = ({ item }) => {
  const [state, setState] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const { data, updateData } = useContext(ProductContext)
  const [formData, setFormData] = useState({
    title: item.title,
    stock: item.stock || 2852,
    price: item.price,
    discountPercentage: item.discountPercentage,
    primary_variant_name: item.primary_variant_name,
    size: "S,M,L +3",
    inventory: item.inventory,
    leadTime: item.leadTime,
  })
  function handleSubmit(id) {
    const updatedData = data.map((product) => {
      if (product.id === id) {
        const newData = { ...product, ...formData }
        console.log("new data", newData)
        return newData
      } else return product
    })
    console.log(updatedData)
    updateData(updatedData)
  }
  const handleChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      }
    })
  }
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
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {state &&
        item.primary_variants.length > 0 &&
        item.primary_variants.map((variant, i) => (
          <>
            <PrimaryList
              key={i}
              variant={variant}
              item={item}
              formData={formData}
            />
          </>
        ))}
    </>
  )
}

export default ProductList
