import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets';
import { ProductCard } from '../components/ProductCard';

export default function ProductCategory() {
    const { products } = useSelector((state) => state.user)
    const { category } = useParams();
    const searchCategory = categories.find((item) => item.path.toLowerCase() === category)
    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category)
    return (
        <div className='mt-16'>
            {
                searchCategory && (
                    <div className="flex flex-col items-end w-max">
                        <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
                        <div className="w-16 h-0.5 bg-[#4fbf8b] rounded-ful "></div>
                    </div>
                )
            }

            {
                filteredProducts.length > 0 ? (
                    <div className="flex flex-wrap mt-6 md:gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[60vh]">
                        <p className='text-2xl font-medium text-[#4fbf8b]'>No products found in this category.</p>
                    </div>
                )
            }
        </div>
    )
}
