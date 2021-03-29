import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { insertCart, oneProducts } from "../../api/ApiRequest"
import { getTimeRemaining } from "../../utils/Utils"

type PropsType = {
    offer: any
}

const Offer: React.FC<PropsType> = ({ offer }) => {
    const history = useHistory()
    const [product, setProduct] = useState<any>(null)
    const [offerLimit, setOfferLimit] = useState<string>("")
    const priceArr = offer.price.split(".")

    useEffect(() => {
        oneProducts(offer.product.id)
        .then(res => setProduct(res.data.data))
    }, [offer])

    useEffect(() => {
        const t = getTimeRemaining(offer.endAt)
        const time = setInterval(() => setOfferLimit(`${t.days}j ${t.hours}h ${t.minutes}min ${t.seconds}s`), 1000)
        return () => clearInterval(time)
    }, [offerLimit, offer])

    const addCart = () => {
        insertCart({ type: "offer", typeId: offer.id, quantity: "1" })
        .then(() => history.push("/cart"))
    }

    const options = () => {
        if (product.options !== null) {
            return (
                <div>
                    <p className="font-medium mt-2">Options : </p>
                    {
                        product.options.map((item: any, index: number) => {
                            return <p key={index} className="text-gray-700">{item.name}: {item.option}</p>
                        })
                    }
                </div>
            )
        }
    }

    if (product !== null) {
        return (
            <div onClick={() => history.push(`/offers/${offer.id}`)} className="flex justify-between items-center space-x-3 mt-2 mb-4 border-b py-4 cursor-pointer">
                <div className="w-2/12">
                    <img src={product.img} alt={product.name} />
                </div>
                <div className="w-full">
                    <h3 className="font-medium text-xl">{product.name}</h3>
                    <p className="text-gray-700">{product.description}</p>
                    {options()}
                    <p className="text-orange-500">{`Il vous reste ${offerLimit} pour commander !`}</p>
                </div>
                <div className="mr-7 w-2/12 flex flex-col justify-between items-center">
                    <div className="flex flex-col items-center mb-2">
                        <span className="flex text-orange-500 font-medium"><p className="text-3xl">{priceArr[0]}</p><sup className="text-lg mt-2">€{priceArr[1]}</sup></span>
                        <p className="font-medium text-black text-md pb-2">Au lieu de <span className="line-through">{product.price}€</span></p>
                    </div>
                    <button onClick={() => addCart()} className="bg-blue-500 text-white text-lg w-full py-1 rounded">Ajouter au panier</button>
                </div>
            </div>
        )
    }
    return null
}

export default Offer