import React, { useEffect, useState } from "react"
import { Redirect, useHistory } from "react-router"
import { insertCart, oneOffer } from '../../api/ApiRequest'
import HeadTitle from "../header/HeadTitle"
import { getTimeRemaining } from '../../utils/Utils'

type PropsType = {
    match: any
}

const OfferById: React.FC<PropsType> = ({ match }) => {
    const history = useHistory()
    const [id] = useState<string>(match.params.id)
    const [offer, setOffer] = useState<any>(null)
    const [offerLimit, setOfferLimit] = useState<string>("")
    const [quantity, setQuantity] = useState<string>("1")
    const [redirect, setRedirect] = useState<boolean>(false)

    useEffect(() => {
        if (id !== undefined) {
            oneOffer(id).then(res => {
                if (res.data.status === "Success") {
                    setOffer(res.data.data)
                } else {
                    setRedirect(true)
                }
            }).catch(err => {
                setRedirect(true)
            })
        }
    }, [id])

    useEffect(() => {
        if (offer !== null) {
            const t = getTimeRemaining(offer.endAt)
            const time = setInterval(() => setOfferLimit(`${t.days}j ${t.hours}h ${t.minutes}min ${t.seconds}s`), 1000)
            return () => clearInterval(time)
        }
    }, [offerLimit, offer])

    const addCart = () => {
        if (offer !== null) {
            insertCart({ type: "offer", typeId: offer.id, quantity: quantity })
            .then(() => history.push("/cart"))
        }
    }

    const renderOption = () => {
        return offer.product.options.map((item: any, index: number) => {
            return (
                <div key={index} className="mt-2">
                    <p>{item.name}</p>
                    <select defaultValue={item.option} className="w-full bg-white my-0.5 px-2 py-3 text-lg border border-gray-300 rounded-md font-medium outline-none cursor-pointer">
                        <option value={item.option.trim()}>{item.option}</option>
                    </select>
                </div>
            )
        })
    }

    const renderQuantity = () => {
        const selectQuantity: string[] = []
        for (let i = 1; i < 100; i++) {
            selectQuantity.push(`${i}`)
        }
        return selectQuantity.map((item: any) => {
            return <option value={item}>{item}</option>
        })
    }

    if (redirect) {
        return (
            <Redirect to={{ pathname: "/not-found" }} />
        )
    }

    if (offer !== null) {
        const priceArr = offer.price.split(".")
        return (
            <>
                <HeadTitle title={offer.product.name} />
                <div className="flex justify-between mt-2 mb-4 py-4">
                    <div className="w-2/3">
                        <img className="w-8/12" src={offer.product.img} alt={offer.product.name} />
                    </div>
                    <div className="w-2/4 flex flex-col">
                        <div className="flex justify-between items-center">
                            <h2 className="font-medium text-2xl">{offer.product.name}</h2>
                            <div className="flex">
                                <span className="flex text-orange-500 font-medium"><p className="text-4xl pb-2">{priceArr[0]}</p><sup className="text-lg mt-2">€{priceArr[1]}</sup></span>
                                <p className="font-medium text-black text-md line-through mt-3">{offer.price}€</p>
                            </div>
                        </div>
                        <p className={`${offer.product.remainingStock > 0 ? "text-green-500" : "text-red-500"} font-medium text-lg mt-2`}>{offer.product.remainingStock > 0 ? "En stock !" : "Pas de stock"}</p>
                        <p className="text-gray-700 mt-2">{offer.product.description}</p>
                        <p className="text-orange-500 mt-2">{`Il vous reste ${offerLimit} pour commander !`}</p>
                        <div>
                            {renderOption()}
                            <div className="mt-2">
                                <p>Quantité</p>
                                <select defaultValue={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full bg-white my-0.5 px-2 py-3 text-lg border border-gray-300 rounded-md font-medium outline-none cursor-pointer">
                                    {renderQuantity()}
                                </select>
                            </div>
                        </div>
                        <button onClick={() => addCart()} className="bg-blue-500 text-white text-lg py-3 text-lg w-full font-medium rounded mt-7">Ajouter au panier</button>
                    </div>
                </div>
            </>
        )
    }

    return null
}

export default OfferById