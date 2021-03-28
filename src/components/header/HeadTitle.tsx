import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'

const HeadTitle: React.FC = () => {
    const location = useLocation()
    const [title, setTitle] = useState<string>("ABC")

    useEffect(() => {
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
                break;
        }
    }, [location])
    
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </>
    )
}

export default HeadTitle
