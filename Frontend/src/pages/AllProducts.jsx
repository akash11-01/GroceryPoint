import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ProductCard } from '../components/ProductCard'

export default function AllProducts() {
    const { products, searchQuery } = useSelector((state) => state.user)
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        } else {
            setFilteredProducts(products)
        }
    }, [products, searchQuery])

    return (
        <div className='mt-16 flex flex-col'>
            <div className="flex flex-col items-end w-max">
                <p className='text-2xl font-medium uppercase'>All Products</p>
                <div className="w-16 h-0.5 bg-[#4fbf8b] rounded-full"></div>
            </div>

            <div className="flex flex-wrap md:gap-6 mt-6">
                {filteredProducts.filter((product) => product.inStock).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}
