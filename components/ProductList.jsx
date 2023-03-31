/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react"
import { useContext } from "react"
import { useRouter } from "next/router"

import { ProductContext } from "../context/ProductContext"

const ProductList = ({ item }) => {
  const router = useRouter()
  const [state, setState] = useState(false)
  const [state1, setState1] = useState("")
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
  // console.log(formData)

  const handleChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      }
    })
  }
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
    // router.push("/")
  }

  return (
    <>
      <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 h-2">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[200px] overflow-hidden text-ellipsis"
          onClick={() => setState(!state)}
        >
          {isEditable ? (
            <input
              className="w-[200px]"
              type="text"
              placeholder={"title"}
              onChange={handleChange}
              name={"title"}
              value={formData.title}
            />
          ) : (
            <p className="whitespace-nowrap dark:text-white max-w-[200px] overflow-hidden text-ellipsis">
              {item.title}
            </p>
          )}
        </th>
        <td className="max-w-full">
          {isEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center"
                type="text"
                placeholder={"Stock"}
                onChange={handleChange}
                name={"stock"}
                value={formData.stock}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center"> {item.stock ? item.stock : "2852"}</p>
          )}
        </td>
        <td>
          {isEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center"
                type="text"
                placeholder={"WHS/price"}
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">{item?.price}</p>
          )}
        </td>

        <td className="px-6 py-4 text-center">{item.discountPercentage}</td>
        <td className="px-6 py-4 text-center flex justify-center items-center">
          {item?.primary_variants?.map((variant, i) => (
            <div key={i}>
              <div
                className={`${
                  variant.name == "Red"
                    ? "block bg-red rounded-full w-4 h-4"
                    : "hidden"
                }`}
              ></div>
              <div
                className={`${
                  variant.name == "Blue"
                    ? "block bg-blue rounded-full w-4 h-4"
                    : "hidden"
                }`}
              ></div>
              <div
                className={`${
                  variant.name == "Green"
                    ? "block bg-green rounded-full w-4 h-4"
                    : "hidden"
                }`}
              ></div>
            </div>
          ))}
        </td>
        <td className="px-6 py-4 text-center">S,M,L+3</td>
        <td className="px-6 py-4 text-center">{item.inventory}</td>
        <td className="px-6 py-4 text-center">{item.leadTime}</td>
        <td className="px-6 py-4 text-right w-40">
          {!isEditable ? (
            <div className="text-center flex justify-center items-center">
              <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                  setIsEditable(true)
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="text-center flex justify-center items-center">
              <button
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                  setIsEditable(false)
                }}
              >
                Cancel
              </button>
              <button
                class="font-medium px-2 text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                  setIsEditable(false)
                  handleSubmit(item.id)
                }}
              >
                Submit
              </button>
            </div>
          )}
          {/* {isEditable && (
            <>
              <div>
                <input
                  type="text"
                  placeholder={"title"}
                  onChange={handleChange}
                  name={"title"}
                  value={formData.title}
                />
                <input
                  type="text"
                  placeholder={"stock"}
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder={"WHS/price"}
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder={"Discount"}
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder={"color"}
                  name="primary_variant_name"
                  value={formData.primary_variant_name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder={"size"}
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder={"Inventory"}
                  name="inventory"
                  value={formData.inventory}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder={"Lead Time"}
                  name="leadTime"
                  value={formData.leadTime}
                  onChange={handleChange}
                />
              </div>

              <button
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                  setIsEditable(false)
                }}
              >
                Cancel
              </button>
              <button
                class="font-medium px-2 text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                  setIsEditable(false)
                  handleSubmit(item.id)
                }}
              >
                Submit
              </button>
            </>
          )} */}
          {/* {isEditable && (
            <>
             
              
            </>
          )} */}
        </td>
      </tr>

      {state &&
        !isEditable &&
        item.primary_variants.length > 0 &&
        item.primary_variants.map((variant) => (
          <>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              onClick={() => {
                if (state1 === `${variant.name}-secondary_variant`) {
                  setState1("")
                } else {
                  setState1(`${variant.name}-secondary_variant`)
                }
              }}
            >
              <th
                scope="row"
                class="px-6 py-4 flex justify-end items-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                onClick={() => setState1(!state1)}
              >
                {/* {item.title} */}
                <span className="text-lg mr-2">{variant.name}</span>
                <span
                  className={`${
                    variant?.active ? "bg-green" : ""
                  } py-1 px-1 rounded-full`}
                >{`${variant?.active ? "Active" : ""} `}</span>
              </th>
              <td class="px-6 py-4 text-center">2852</td>
              <td class="px-6 py-4 text-center">{item.price}</td>
              <td class="px-6 py-4 text-center">
                {variant.discountPercentage}
              </td>
              <td class="px-6 py-4 text-center">{item.primary_variant_name}</td>
              <td class="px-6 py-4 text-center">S,M,L+3</td>
              <td class="px-6 py-4 text-center">{variant.inventory}</td>
              <td class="px-6 py-4 text-center">{item.leadTime}</td>
              <td class="px-6 py-4 text-center">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline text-center"
                >
                  Edit
                </a>
              </td>
            </tr>

            {state1 === `${variant.name}-secondary_variant` &&
              variant.secondary_variants.length > 0 &&
              variant.secondary_variants.map((secondary, i) => (
                <tr key={i} class="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    class="px-6 py-4 flex justify-end font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* {item.title} */}
                    {secondary.name}
                  </th>
                  <td class="px-6 py-4 text-center">2582</td>
                  <td class="px-6 py-4 text-center">{secondary.price}</td>
                  <td class="px-6 py-4 text-center">
                    {secondary.discountPercentage}
                  </td>
                  <td class="px-6 py-4 text-center">NA</td>
                  <td class="px-6 py-4 text-center">NA</td>
                  <td class="px-6 py-4 text-center">{secondary.inventory}</td>
                  <td class="px-6 py-4 text-center">{item.leadTime}</td>
                  <td class="px-6 py-4 text-right">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline text-center"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
          </>
        ))}
    </>
  )
}

export default ProductList
