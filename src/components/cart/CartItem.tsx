import React, { useEffect, useState } from "react"
import { oneOffer, oneProducts, oneUpdateCart, oneDeleteCart } from '../../api/ApiRequest'

type PropsType = {
    cart: any
}

const CartItem: React.FC<PropsType> = ({ cart }) => {
    const type = cart.type
    const quantity = cart.quantity
    const [cartItem, setCartItem] = useState<any>(null)

    useEffect(() => {
        if (type === "offer") {
            oneOffer(cart.typeId)
            .then((res) => setCartItem(res.data.data))
        } else {
            oneProducts(cart.typeId)
            .then((res) => setCartItem(res.data.data))
        }
    }, [type])

    const options = (product: any) => {
        if (product.options !== null) {
            return (
                <div>
                    <p className="font-medium mt-2">Options : </p>
                    {
                        product.options.map((item: any) => {
                            return <p className="text-gray-700">{item.name}: {item.option}</p>
                        })
                    }
                </div>
            )
        }
    }

    const handlerQuantity = (e: any) => {
        let cartTmp = cart
        cart.quantity = e.target.value
        oneUpdateCart(cart.id, cartTmp)
        .then(() => window.location.reload()) 
    }

    const renderQuantity = () => {
        const selectQuantity: string[] = []
        for (let i = 1; i < 100; i++) {
            selectQuantity.push(`${i}`)
        }
        return (
            <div className="mt-2">
                <p>Quantité</p>
                <select defaultValue={quantity} onChange={(e) => handlerQuantity(e)} className="w-full bg-white my-0.5 px-1 py-2 text-md border border-gray-300 rounded-md font-medium outline-none cursor-pointer">
                    {selectQuantity.map((item: any) => {
                        return <option value={item}>{item}</option>
                    })}
                </select>
            </div>
        )
    }

    const removeCart = () => {
        oneDeleteCart(cart.id)
        .then(() => window.location.reload()) 
    }

    if (cartItem !== null) {
        const product = (type === "offer") ? cartItem.product : cartItem
        const priceArr = (type === "offer") ? `${(Number(cartItem.price) * quantity).toFixed(2)}`.split(".") : `${(Number(product.price) * quantity).toFixed(2)}`.split(".")

        return (
            <div className="flex justify-between  space-x-3 mt-2 mb-4 border-b py-4">
                <div className="w-2/12">
                    <img src={product.img} alt={product.name} />
                </div>
                <div className="w-full">
                    <h3 className="font-medium text-xl">{product.name}</h3>
                    <p className="text-gray-700">{product.description}</p>
                    {options(product)}
                </div>
                <div className="mr-7 w-2/12 flex flex-col justify-between items-center">
                    <div className="flex flex-col items-center mb-2">
                        <div className="flex flex-col text-center">
                            <span className="flex text-orange-500 font-medium justify-center"><p className="text-4xl pb-2">{priceArr[0]}</p><sup className="text-lg mt-2">€{priceArr[1]}</sup></span>
                            {type === "offer" && <p className="font-medium text-black text-md pb-2">Au lieu de <span className="line-through">{Number(cartItem.product.price) * quantity}€</span></p>}
                        </div>
                        {renderQuantity()}
                        <button onClick={() => removeCart()} className="bg-red-500 text-white text-md px-2 py-1 mt-2 rounded">retirer</button>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

export default CartItem