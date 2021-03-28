import React from 'react'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Routes from '../routes/Routes'
import Header from './header/Header'
import "react-toastify/dist/ReactToastify.css"
import "../assets/css/Notification.css"
import HeadTitle from './header/HeadTitle'

const App: React.FC = () => {
    const location = useLocation()
    return (
        <>
            <ToastContainer
                position={toast.POSITION.TOP_RIGHT}
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
            <HeadTitle />
            <Header />
            <div className={`${location.pathname !== "/not-found" ? "container sm:w-11/12 px-3 sm:px-0 container-padding" : ""}`}>
                <Routes />
            </div>
        </>
    )
}

export default App
