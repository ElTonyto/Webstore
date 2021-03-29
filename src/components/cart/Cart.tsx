import React, { useEffect, useState } from "react"
import { oneCart, oneOffer, oneProducts } from '../../api/ApiRequest'
import CartItem from "./CartItem"

const Cart: React.FC = () => {
    const [cart, setCart] = useState<Array<any>>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)

    useEffect(() => {
        oneCart()
        .then((res) => {
            setCart(res.data.data)
        })
    }, [])

    useEffect(() => {
        (async function getTotalPrice() {
            let priceTmp = 0
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].type === "offer") {
                    await oneOffer(cart[i].typeId)
                    .then((res) => priceTmp += (Number(res.data.data.price) * cart[i].quantity))
                } else {
                    await oneProducts(cart[i].typeId)
                    .then((res) => priceTmp += (Number(res.data.data.price) * cart[i].quantity))
                }
            }
            setTotalPrice(priceTmp)
        })()
    }, [cart])

    if (totalPrice >= 0) {
        const priceArr = `${totalPrice.toFixed(2)}`.split(".")
        return (
            <div>
                <h2 className="font-medium text-2xl">Panier</h2>
                <div className="flex justify-between space-x-4">
                    <div className="w-5/5">
                        {!cart.length && <p>Votre panier est vide.</p>}
                        {
                            cart.map((item: any) => {
                                return <CartItem key={item.id} cart={item} />
                            })
                        }
                    </div>
                    <div className="w-2/3 flex flex-col justify center">
                        <h3 className="text-xl font-medium">Récapitulatif</h3>
                        <div className="px-10 py-3 border flex flex-col justify center">
                            <p className="flex justify-between">Total: <span className="flex text-orange-500 font-medium"><p className="text-4xl pb-2">{priceArr[0]}</p><sup className="text-lg mt-2">€{priceArr[1]}</sup></span></p>
                            <button className="bg-blue-500 text-white text-md w-full py-2 mt-3 rounded">Passer au paiement</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

export default Cart