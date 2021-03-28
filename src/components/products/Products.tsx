import React, { useEffect, useState } from "react"
import { allParentProducts } from '../../api/ApiRequest'
import Product from "./Product"

const Products: React.FC = () => {
    const [products, setProducts] = useState<Array<any>>([])

    useEffect(() => {
        allParentProducts()
        .then((res) => setProducts(res.data.data))
    }, [])

    return (
        <div>
            <h2 className="font-medium text-2xl">Liste des produits</h2>
            {
                products.map((item: any, index: number) => {
                    return <Product key={item.id} product={item} />
                })
            }
        </div>
    )
}

export default Products