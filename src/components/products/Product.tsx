import React from "react"
import { useHistory } from "react-router"

type PropsType = {
    product: any
}

const Product: React.FC<PropsType> = ({ product }) => {
    const history = useHistory()

    const options = () => {
        if (product.allOptions !== null) {
            return (
                <div>
                    <p className="font-medium mt-2">Options : </p>
                    {
                        product.allOptions.map((item: any) => {
                            return <p className="text-gray-700">{item.name}: {item.option}</p>
                        })
                    }
                </div>
            )
        }
    }

    return (
        <div onClick={() => history.push(`/products/${product.id}`)} className="flex justify-between items-center space-x-3 mt-2 mb-4 border-b py-4 cursor-pointer">
            <div className="w-2/12">
                <img src={product.img} alt={product.name} />
            </div>
            <div className="w-full">
                <h3 className="font-medium text-xl">{product.name}</h3>
                <p className="text-gray-700">{product.description}</p>
                {options()}
            </div>
            <div className="mr-7 w-2/12 flex flex-col justify-between items-center">
                <div className="flex flex-col items-center mb-2">
                    <p className="text-xl">A partir de</p>
                    <p className="font-medium text-orange-500 text-3xl pb-2">{product.price} €</p>
                </div>
                <button className="bg-blue-500 text-white text-lg w-full rounded">Voir</button>
            </div>
        </div>
    )
}

export default Product