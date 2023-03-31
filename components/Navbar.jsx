import React from "react"
import { HiOutlineDocumentDownload, HiOutlineUpload } from "react-icons/hi"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"

import { useScrollDirection } from "../hook/useScrollDirection"
import SearchBar from "./Search"



function Navbar() {
  const scrollDirection = useScrollDirection()
  const router = useRouter()
  const handleNavigate = () => {
    router.push("/create")
  }

  return (
    <motion.nav
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, x: 0 },
        visible: { opacity: 1, x: 0 },
      }}
      className={`navbar font-mulish bg-gray-100 h-[70px] md:h-[70px] flex flex-row justify-end items-center backdrop-blur-lg fixed top-0 right-0 left-0 z-20 md:py-4 ${
        scrollDirection == "down" ? "-top-28 md:-top-28" : "top-0"
      } transition-all duration-750`}
    >
      <div className="w-[95%] max-w-7xl flex flex-row items-center justify-between mx-auto ">
        <Link
          className="signature text-black  font-playfair font-semibold cursor-pointer"
          href="/"
        >
          <div className="font-mada text-xl ">
            Inventory{" "}
            <span className="text-gray-400">Collection Analytics</span>
          </div>
        </Link>
        <SearchBar />

        <div className="flex ">
          <button
            className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-3"
            onClick={handleNavigate}
          >
            + Add new products
          </button>
          <div className="flex items-center mr-3">
            <HiOutlineDocumentDownload /> Import data{" "}
          </div>
          <div className="flex items-center mr-3">
            <HiOutlineUpload /> Export data{" "}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
