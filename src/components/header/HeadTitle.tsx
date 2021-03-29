import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'

type PropsType = {
    title?: string
}

const HeadTitle: React.FC<PropsType> = ({ title }) => {
    const location = useLocation()
    const [titleRender, setTitle] = useState<string>("ABC")

    useEffect(() => {
        if (title === null || title === undefined) {
            switch(location.pathname) {
                case "/cart":
                    setTitle("Panier - ABC")
                    break;
                case "/offers":
                    setTitle("Offres - ABC")
                    break;
                case "/products":
                    setTitle("Produits - ABC")
                    break;
                case "/not-found":
                    setTitle("Page introuvable - ABC")
                    break;
                case "/order-summary":
                    setTitle("Résumé de la commande - ABC")
                    break;
                case "/":
                    setTitle("ABC")
                    break;
                default:
                    setTitle("ABC")
                    break;
            }
        } else {
            setTitle(`${title} - ABC`)
        }
    }, [location, title])
    
    return (
        <>
            <Helmet>
                <title>{titleRender}</title>
            </Helmet>
        </>
    )
}

export default HeadTitle
