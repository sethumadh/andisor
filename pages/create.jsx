import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/router"

import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"

export default function AddItemForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    stock: "",
    price: 0,
    discountPercentage: "",
    primary_variant_name: "",
    size: "",
    inventory: 0,
    leadTime: "",
  })

  const { data, updateData } = useContext(ProductContext)
  //   console.log(data)

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        id: uuidv4(),
        [e.target.name]: e.target.value,
      }
    })
  }
  function handleSubmit(event) {
    event.preventDefault()
    const newData = [...data, formData]
    console.log(newData)
    updateData(newData)
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md ">
      <h2 className="text-lg font-medium mb-4 mt-16">Add New Item</h2>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="col-span-2">
          <label htmlFor="productName" className="block font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="title"
            className="border-gray-300 border rounded-md w-[61%] py-2 px-3 mb-4"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="stock" className="block font-medium mb-2">
            Stock
          </label>
          <input
            type="number"
            className="border-gray-300 border rounded-md py-2 px-3 mb-4 w-40"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="WHS" className="block font-medium mb-2">
            WHS
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-md w-40 py-2 px-3 mb-4"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="discount" className="block font-medium mb-2">
            Discount
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-md w-40 py-2 px-3 mb-4"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="colour" className="block font-medium mb-2">
            Colour
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-md w-40 py-2 px-3 mb-4"
            name="primary_variant_name"
            value={formData.primary_variant_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="size" className="block font-medium mb-2">
            Size
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-md w-40 py-2 px-3 mb-4"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="inventory" className="block font-medium mb-2">
            Inventory
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-md w-40 py-2 px-3 mb-4"
            name="inventory"
            value={formData.inventory}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="inventory" className="block font-medium mb-2">
            Lead Time
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-md w-40 py-2 px-3 mb-4"
            name="leadTime"
            value={formData.leadTime}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="ml-96">
        <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
  )
}
