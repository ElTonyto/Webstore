import React from "react"
import NotFoundIcon from "../../assets/img/errors/not_found.svg"
import { useHistory } from 'react-router-dom'

const NotFound: React.FC = () => {
    const history = useHistory()
    return (
        <div className="h-screen flex items-center">
            <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                <div className="max-w-md">
                    <div className="text-5xl font-dark font-bold">404</div>
                    <p className="text-2xl md:text-3xl font-light leading-normal">Désolé, nous n'avons pas pu trouver cette page.</p>
                    <p className="mb-8">Mais ne vous inquiétez pas, vous pouvez trouver plein d'autres choses sur notre page d'accueil.</p>
                    <button onClick={() => history.push("/")} className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">Retour à l'accueil</button>
                </div>
                <div className="max-w-lg">
                    <img src={NotFoundIcon} alt="not found" />
                </div>
            </div>
        </div>
    )
}

export default NotFound
