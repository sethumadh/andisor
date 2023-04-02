import React from "react"


const MainList = ({ item,handleChange,handleSubmit, formData, isEditable, handleStateChange, handleEdit }) => {
  
  
  return (
    <>
      <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[200px] overflow-hidden text-ellipsis"
          onClick={() => handleStateChange()}
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
        <td className="">
          {isEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center "
                type="text"
                placeholder={"Stock"}
                onChange={handleChange}
                name={"stock"}
                value={formData.stock}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">
              {item.stock ? item.stock : "2852"}
            </p>
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
        <td>
          {isEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center"
                type="text"
                placeholder={"discount"}
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">{item.discountPercentage}</p>
          )}
        </td>

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
              <div
                className={`${
                  variant.name == "Yellow"
                    ? "block bg-yellow rounded-full w-4 h-4"
                    : "hidden"
                }`}
              ></div>
              <div
                className={`${
                  variant.name == "White"
                    ? "block bg-white border-[1px] border-black rounded-full w-4 h-4"
                    : "hidden"
                }`}
              ></div>
            </div>
          ))}
        </td>
        <td className="px-6 py-4 text-center">S,M,L+3</td>
        <td>
          {isEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[50px] text-center"
                type="text"
                placeholder={"inventory"}
                name="inventory"
                value={formData.inventory}
                onChange={handleChange}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">{item.inventory}</p>
          )}
        </td>
        <td>
          {isEditable ? (
            <div className="flex justify-center items-center">
              <input
                className="max-w-[75px] text-center"
                type="text"
                placeholder={"lead time"}
                name="leadTime"
                value={formData.leadTime}
                onChange={handleChange}
              />
            </div>
          ) : (
            <p className="px-6 py-4 text-center">{item.leadTime}</p>
          )}
        </td>

        <td className="px-6 py-4 text-center w-40">
          {!isEditable ? (
            <div className="text-center flex justify-center items-center">
              <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                    handleEdit(true)
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
                    handleEdit(false)
                }}
              >
                Cancel
              </button>
              <button
                className="font-medium px-2 text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => {
                    handleEdit(false)
                  handleSubmit(item.id)
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

export default MainList
