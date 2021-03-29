import React, { useEffect, useState } from "react"
import { oneCart, oneOffer, oneProducts } from '../../api/ApiRequest'
import CartItem from "./CartItem"
import EmptyCartIcon from "../../assets/img/errors/empty_cart.svg"
import { useHistory } from "react-router"

const Cart: React.FC = () => {
    const history = useHistory()
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

    if (cart.length === 0) {
        return (
            <div className="mt-20 flex items-center">
                <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                    <div className="max-w-md">
                        <div className="text-5xl font-dark font-bold">Panier vide</div>
                        <p className="text-2xl md:text-3xl font-light leading-normal"></p>
                        <p className="mb-8">Vous pouvez compléter votre panier depuis les pages Offre et Produit.</p>
                        <button onClick={() => history.push("/")} className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">Retour à l'accueil</button>
                    </div>
                    <div className="max-w-lg">
                        <img src={EmptyCartIcon} alt="empty cart" />
                    </div>
                </div>
            </div>
        )
    }

    if (totalPrice >= 0) {
        const priceArr = `${totalPrice.toFixed(2)}`.split(".")
        return (
            <div>
                <h2 className="font-medium text-2xl">Panier</h2>
                <div className="flex justify-between space-x-4">
                    <div className="w-5/5">
                        {
                            cart.map((item: any) => {
                                return <CartItem key={item.id} cart={item} />
                            })
                        }
                    </div>
                    {cart.length > 0 && (
                        <div className="w-2/3 flex flex-col justify center">
                            <h3 className="text-xl font-medium">Récapitulatif</h3>
                            <div className="px-10 py-3 border flex flex-col justify center">
                                <p className="flex justify-between">Total: <span className="flex text-orange-500 font-medium"><p className="text-4xl pb-2">{priceArr[0]}</p><sup className="text-lg mt-2">€{priceArr[1]}</sup></span></p>
                                <button className="bg-blue-500 text-white text-md w-full py-2 mt-3 rounded">Passer au paiement</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
    return null
}

export default Cart