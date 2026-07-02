import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {

    let [showFilter,setShowFilter] = useState(false)
    let {products,search,showSearch} = useContext(shopDataContext)
    let [filterProduct,setFilterProduct] = useState([])
    let [category,setCaterory] = useState([])
    let [subCategory,setSubCaterory] = useState([])
    let [sortType,SetSortType] = useState("relavent")

    const toggleCategory = (e) =>{
        if(category.includes(e.target.value)){
            setCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setCaterory(prev => [...prev,e.target.value])
         }
    }

    const toggleSubCategory = (e) =>{
         if(subCategory.includes(e.target.value)){
            setSubCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setSubCaterory(prev => [...prev,e.target.value])
         }
    }

    const applyFilter = ()=>{
        let productCopy = products.slice()

        if(showSearch && search){
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if(category.length > 0)
        {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if(subCategory.length > 0)
        {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProduct(productCopy)

    }


    const sortProducts = (e)=>{
        let fbCopy = filterProduct.slice()

        switch(sortType){
         case 'low-high':
            setFilterProduct(fbCopy.sort((a,b)=>(a.price - b.price)))
        break;

         case 'high-low':
            setFilterProduct(fbCopy.sort((a,b)=>(b.price - a.price)))
        break;
        default:
            applyFilter()
        break;
        }

    }

    useEffect(()=>{
        sortProducts()
    },[sortType])


    useEffect(()=>{
    setFilterProduct(products)
    },[products])

    useEffect(()=>{
        applyFilter()
    },[category,subCategory,search ,showSearch])






return (
  <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[80px] pb-[80px]">

    {/* Header */}
    <div className="w-full px-4 md:px-8 flex flex-row items-center justify-between">
      <Title text1={"ALL"} text2={"COLLECTIONS"} />

      <select
        className="bg-slate-600 text-white rounded-lg border-2 border-gray-500 hover:border-[#46d1f7] px-3 py-2 text-sm md:text-base"
        onChange={(e) => SetSortType(e.target.value)}
      >
        <option value="relavent">Sort By: Relevant</option>
        <option value="low-high">Price : Low to High</option>
        <option value="high-low">Price : High to Low</option>
      </select>
    </div>

    {/* Mobile Filter */}
    <div className="md:hidden px-4 mt-5">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="w-full bg-slate-700 text-white rounded-lg py-3 flex justify-between items-center px-4"
      >
        <span className="font-semibold">FILTERS</span>

        {showFilter ? <FaChevronDown /> : <FaChevronRight />}
      </button>

      {showFilter && (
        <div className="mt-4 space-y-4">

          <div className="border rounded-lg bg-slate-600 p-4 text-white">
            <p className="font-semibold mb-3">CATEGORIES</p>

            <label className="flex gap-2">
              <input type="checkbox" value="Men" onChange={toggleCategory} />
              Men
            </label>

            <label className="flex gap-2 mt-2">
              <input type="checkbox" value="Women" onChange={toggleCategory} />
              Women
            </label>

            <label className="flex gap-2 mt-2">
              <input type="checkbox" value="Kids" onChange={toggleCategory} />
              Kids
            </label>
          </div>

          <div className="border rounded-lg bg-slate-600 p-4 text-white">
            <p className="font-semibold mb-3">SUB CATEGORIES</p>

            <label className="flex gap-2">
              <input type="checkbox" value="TopWear" onChange={toggleSubCategory} />
              TopWear
            </label>

            <label className="flex gap-2 mt-2">
              <input type="checkbox" value="BottomWear" onChange={toggleSubCategory} />
              BottomWear
            </label>

            <label className="flex gap-2 mt-2">
              <input type="checkbox" value="WinterWear" onChange={toggleSubCategory} />
              WinterWear
            </label>
          </div>

        </div>
      )}
    </div>

    <div className="flex mt-8">

      {/* Desktop Filter */}
      <div className="hidden md:block w-[260px] px-5 text-[#aaf5fa]">

        <div className="border rounded-lg bg-slate-700 p-5">
          <p className="text-xl mb-4">CATEGORIES</p>

          <label className="flex gap-2">
            <input type="checkbox" value="Men" onChange={toggleCategory} />
            Men
          </label>

          <label className="flex gap-2 mt-3">
            <input type="checkbox" value="Women" onChange={toggleCategory} />
            Women
          </label>

          <label className="flex gap-2 mt-3">
            <input type="checkbox" value="Kids" onChange={toggleCategory} />
            Kids
          </label>
        </div>

        <div className="border rounded-lg bg-slate-700 p-5 mt-6">
          <p className="text-xl mb-4">SUB CATEGORIES</p>

          <label className="flex gap-2">
            <input type="checkbox" value="TopWear" onChange={toggleSubCategory} />
            TopWear
          </label>

          <label className="flex gap-2 mt-3">
            <input type="checkbox" value="BottomWear" onChange={toggleSubCategory} />
            BottomWear
          </label>

          <label className="flex gap-2 mt-3">
            <input type="checkbox" value="WinterWear" onChange={toggleSubCategory} />
            WinterWear
          </label>
        </div>

      </div>

      {/* Products */}
      <div className="flex-1 px-4">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">

          {filterProduct.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}

        </div>

      </div>

    </div>

  </div>
)
}

export default Collections