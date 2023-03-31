import React, {useState,useEffect} from "react"
const ProductContext = React.createContext()

function ProductContextProvider(props) {
    const [data, setData] = useState("")

    useEffect(() => {
      let localData = JSON.parse(localStorage.getItem("andisor"))
      // console.log(localData)
  
      async function fetchData() {
        try {
          const response = await fetch(
            "https://mocki.io/v1/b5a9b9f1-0198-43af-8e79-ae39d1b97f42"
          )
          const json = await response.json()
          if (response.ok) {
            localData = localStorage.setItem("andisor", JSON.stringify(json))
            setData(json)
          }
        } catch (error) {
          console.log(error)
        }
      }
      if (!localData) {
        fetchData()
      } else if (localData) {
        setData(localData)
      }
    }, [])

    function updateData(data){
        localStorage.setItem("andisor", JSON.stringify(data))
        setData(data)
    }
   
    return (
        <ProductContext.Provider value={{data, updateData}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export { ProductContextProvider, ProductContext}