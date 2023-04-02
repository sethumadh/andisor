import React, { useState } from "react"
import { useContext } from "react"

import { ProductContext } from "../context/ProductContext"
import SubVariantList from "../components/SubVariantList"
const PrimaryList = ({ variant, item }) => {
  const { data, updateData } = useContext(ProductContext)
  const [state1, setState1] = useState({
    Red: "",
    Blue: "",
    Green: "",
  })
  const [isPrimaryEditable, setIsPrimaryEditable] = useState(false)
  const [primaryFormData, setPrimaryFormData] = useState({
    stock: variant.stock || 2852,
    price: variant.price,
    discountPercentage: variant.discountPercentage,
    inventory: variant.inventory,
  })
  const handleChangePrimary = (e) => {
    console.log("onchange called")
    setPrimaryFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      }
    })
  }
  function handlePrimarySubmit(name) {
    console.log("submitcalled")
    const updatedData = item?.primary_variants?.map((product) => {
      if (product.name === name) {
        const newData = { ...product, ...primaryFormData }
        return newData
      } else return product
    })
    const newItem = { ...item, primary_variants: updatedData }
    const newData = data.map((item) => {
      if (item.id === newItem.id) return newItem
      else return item
    })
    console.log("New Data", newData)
    updateData(newData)
  }
  const handlePrimaryEdit = (bool) => {
    setIsPrimaryEditable(bool)
  }

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 flex justify-end items-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
          onClick={() => {
            if (state1[variant.name] === `${variant.name}-secondary_variant`) {
              setState1((preState) => ({
                ...preState,
                [variant.name]: "",
              }))
            } else {
              setState1((preState) => ({
                ...preState,
                [variant.name]: `${variant.name}-secondary_variant`,
              }))
            }
          }}
        >
          <span className="text-lg mr-2">{variant.name}</span>
          <span
            className={`${
              variant?.active ? "bg-green" : ""
            } py-1 px-1 rounded-full`}
          >{`${variant?.active ? "Active" : ""} `}</span>
        </th>
        <td>
          {isPrimaryEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center "
                type="text"
                placeholder={"Stock"}
                name={"stock"}
                value={primaryFormData.stock}
                onChange={handleChangePrimary}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">{variant.stock}</p>
          )}
        </td>
        <td>
          {isPrimaryEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center "
                type="text"
                placeholder={"WHS/Price"}
                name={"price"}
                value={primaryFormData.price}
                onChange={handleChangePrimary}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">{variant.price}</p>
          )}
        </td>
        <td>
          {isPrimaryEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center "
                type="text"
                placeholder={"Discount"}
                onChange={handleChangePrimary}
                name={"discountPercentage"}
                value={primaryFormData.discountPercentage}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">
              {variant.discountPercentage}
            </p>
          )}
        </td>

        <td className="px-6 py-4 text-center flex justify-center items-center">
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
        <td className="px-6 py-4 text-center">S,M,L+3</td>
        <td>
          {isPrimaryEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center "
                type="text"
                placeholder={"inventory"}
                onChange={handleChangePrimary}
                name={"inventory"}
                value={primaryFormData.inventory}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">{variant.inventory}</p>
          )}
        </td>
        <td>
          <p className="px-6 py-4 text-center">{item.leadTime}</p>
        </td>
        <td className="px-6 py-4 text-center w-40">
          {!isPrimaryEditable ? (
            <div className="text-center flex justify-center items-center">
              <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                  handlePrimaryEdit(true)
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
                  handlePrimaryEdit(false)
                }}
              >
                Cancel
              </button>
              <button
                className="font-medium px-2 text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                  handlePrimaryEdit(false)
                  handlePrimarySubmit(variant.name)
                }}
              >
                Submit
              </button>
            </div>
          )}
        </td>
      </tr>

      {state1[variant.name] === `${variant.name}-secondary_variant` &&
        variant?.secondary_variants?.length > 0 &&
        variant?.secondary_variants?.map((secondary, i) => (
          <SubVariantList key={i} item={item} variant={variant} secondary={secondary} />
        ))}
    </>
  )
}

export default PrimaryList
