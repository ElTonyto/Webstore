import React, { useEffect, useState } from "react"
import { allOffers } from '../../api/ApiRequest'
import Offer from "./Offer"

const Offers: React.FC = () => {
    const [offers, setOffers] = useState<Array<any>>([])

    useEffect(() => {
        allOffers()
        .then((res) => setOffers(res.data.data))
    }, [])

    return (
        <div>
            <h2 className="font-medium text-2xl">Liste des offres</h2>
            {
                offers.map((item: any, index: number) => {
                    return <Offer key={item.id} offer={item} />
                })
            }
        </div>
    )
}

export default Offers