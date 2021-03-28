import React, { useEffect, useState } from "react"
import { Redirect } from "react-router"
import { oneOffer } from '../../api/ApiRequest'
import HeadTitle from "../header/HeadTitle"

type PropsType = {
    match: any
}

const OfferById: React.FC<PropsType> = ({ match }) => {
    const [id] = useState<string>(match.params.id)
    const [offer, setOffer] = useState<any>(null)
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

    if (redirect) {
        return (
            <Redirect to={{ pathname: "/not-found" }} />
        )
    }

    if (offer !== null) {
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
                            <p className="font-medium text-orange-500 text-4xl pb-2">{offer.price}€</p>
                        </div>
                        <p className={`${offer.product.remainingStock > 0 ? "text-green-500" : "text-red-500"} font-medium text-lg mt-2`}>{offer.product.remainingStock > 0 ? "En stock !" : "Pas de stock"}</p>
                        <p className="text-gray-700 mt-2">{offer.product.description}</p>
                        <div>
                            {renderOption()}
                        </div>
                        <button className="bg-blue-500 text-white text-lg py-3 text-lg w-full font-medium rounded mt-7">Ajouter au panier</button>
                    </div>
                </div>
            </>
        )
    }

    return null
}

export default OfferById