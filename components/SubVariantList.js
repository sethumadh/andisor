import React, { useState } from "react"
import { useContext } from "react"

import { ProductContext } from "../context/ProductContext"
const SubVariantList = ({ item, variant, secondary }) => {
  const { data, updateData } = useContext(ProductContext)
  const [isSecondaryEditable, setIsSecondaryEditable] = useState(false)
  const [secondaryFormData, setSecondaryFormData] = useState({
    stock: secondary.stock || 2852,
    price: secondary.price,
    discountPercentage: secondary.discountPercentage,
    inventory: secondary.inventory,
  })
  console.log(variant)
  function handleSecondarySubmit(name) {
    console.log("submitcalled")
    const updatedData = { ...secondary, ...secondaryFormData }
    const newSecVariant = variant.secondary_variants.map((item) => {
      if (item.name == updatedData.name) return updatedData
      else return item
    })

    const newPrimVar = item.primary_variants.map((item) => {
      if (item.name == variant.name)
        return { ...item, secondary_variants: newSecVariant }
      else return item
    })
    const newItem = { ...item, primary_variants: newPrimVar }
    console.log("primary_variants", newItem)
    const newData = data.map((item) => {
      if (item.id === newItem.id) return newItem
      else return item
    })
    console.log("New Data", newData)
    updateData(newData)
  }
  const handleSecondaryEdit = (bool) => {
    setIsSecondaryEditable(bool)
  }
  const handleChangeSecondary = (e) => {
    console.log("onchange called")
    setSecondaryFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      }
    })
  }
  return (
    <>
      <tr className="bg-white dark:bg-gray-800">
        <th
          scope="row"
          className="px-6 py-4 flex justify-end font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {secondary.name}
        </th>
        <td className="px-6 py-4 text-center">2582</td>
        <td>
          {isSecondaryEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center "
                type="text"
                placeholder={"WHS/Price"}
                name={"price"}
                value={secondaryFormData.price}
                onChange={handleChangeSecondary}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">{secondary.price}</p>
          )}
        </td>
        <td>
          {isSecondaryEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center "
                type="text"
                placeholder={"Discount"}
                name={"discountPercentage"}
                value={secondaryFormData.discountPercentage}
                onChange={handleChangeSecondary}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">
              {secondary.discountPercentage}
            </p>
          )}
        </td>

        <td className="px-6 py-4 text-center flex justify-center items-center">
          {" "}
          <div
            className={`${
              variant.name == "Red"
                ? "block bg-red rounded-full w-4 h-4"
                : variant.name == "Yellow"
                ? "block bg-yellow rounded-full w-4 h-4"
                : variant.name == "White"
                ? "block bg-white border-4 rounded-full w-4 h-4"
                : variant.name == "Blue"
                ? "block bg-blue rounded-full w-4 h-4"
                : variant.name == "Green"
                ? "block bg-green rounded-full w-4 h-4"
                : "hidden"
            }`}
          ></div>
        </td>
        <td className="px-6 py-4 text-center">{secondary.name}</td>
        <td>
          {isSecondaryEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center "
                type="text"
                placeholder={"inventory"}
                name={"inventory"}
                value={secondaryFormData.inventory}
                onChange={handleChangeSecondary}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">{secondary.inventory}</p>
          )}
        </td>
        <td className="px-6 py-4 text-center">{item.leadTime}</td>
        <td className="px-6 py-4 text-center">
          {!isSecondaryEditable ? (
            <div className="text-center flex justify-center items-center">
              <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                  handleSecondaryEdit(true)
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="text-center flex justify-center items-center">
              <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                  handleSecondaryEdit(false)
                }}
              >
                Cancel
              </button>
              <button
                className="font-medium px-2 text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                  handleSecondaryEdit(false)
                  handleSecondarySubmit(variant.name)
                }}
              >
                Submit
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  )
}

export default SubVariantList
