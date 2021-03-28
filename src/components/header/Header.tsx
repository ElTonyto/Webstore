import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { Transition } from "@headlessui/react"

const Header: React.FC = () => {
    const history = useHistory()
    const location = useLocation()
    const [navbarOpen, setNavbarOpen] = useState<boolean>(false)
    const [pathname, setPathname] = useState<string>(location.pathname)

    useEffect(() => {
        if (navbarOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [navbarOpen])


    useEffect(() => {
        setPathname(location.pathname)
    }, [location])


    return (
        <nav className="w-full bg-white shadow-lg fixed z-50">
            <div className="sm:container sm:py-0 sm:flex items-center justify-between w-full lg:w-11/12">
                <div className="relative flex items-center justify-between w-full z-50">
                    <div className="absolute inset-y-0 flex items-center sm:hidden">
                        <button type="button" onClick={() => setNavbarOpen(!navbarOpen) } className="inline-flex items-center justify-center m-2 p-2 rounded-md text-black-400 hover:bg-gray-100 focus:outline-none focus:bg-white focus:ring-inset focus:ring-black" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${navbarOpen ? "hidden" : "block"} h-9 w-9`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${navbarOpen ? "block" : "hidden"} h-9 w-9`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:justify-start bg-white">
                        <div onClick={() => { history.push('/') }} className="flex-shrink-0 flex items-center cursor-pointer py-3">
                            <h1 className="text-xl font-medium">ABC</h1>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-1 h-16">
                                <div onClick={() => { history.push('/offers') }} className={`${(pathname.includes("/offers")) ? "border-blue-500 text-blue-500" : "text-gray-600 border-white hover:border-blue-500 hover:border-opacity-70 hover:text-blue-500 hover:text-opacity-70"  } border-b-2 px-5 py-5 text-lg font-medium cursor-pointer`}>
                                    <p>Offres</p>
                                </div>
                                <div onClick={() => { history.push('/products') }} className={`${(pathname.includes("/products")) ? "border-blue-500 text-blue-500" : "text-gray-600 border-white hover:border-blue-500 hover:border-opacity-70 hover:text-blue-500 hover:text-opacity-70"  } border-b-2 px-5 py-5 text-lg font-medium cursor-pointer`}>
                                    <p>Produits</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="ml-3 relative">
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-1 h-16">
                                    <div onClick={() => { history.push('/cart') }} className={`${(pathname.includes("/cart")) ? "border-blue-500 text-blue-500" : "text-gray-600 border-white hover:border-blue-500 hover:border-opacity-70 hover:text-blue-500 hover:text-opacity-70" } border-b-2 px-5 py-5 text-lg font-medium cursor-pointer flex justify-start space-x-2 items-center`}>
                                        <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                        <p>Panier</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Transition show={navbarOpen} className="absolute w-full h-full">
                <div className={`sm:hidden bg-gray-500 bg-opacity-40 z-40 w-full header-dropdown`} onClick={() => { setNavbarOpen(false) }} id="mobile-menu">
                    <Transition.Child
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-y-full"
                        enterTo="translate-y-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-y-0"
                        leaveTo="-translate-y-full"
                    >
                        <div>
                            <div className={`sm:hidden bg-white shadow-lg`} id="mobile-menu">
                                <div className="px-2 pb-2 space-y-1">
                                    <div onClick={() => { history.push('/offers'); setNavbarOpen(false) }} className={`${(pathname.includes("/offers")) ? "border-blue-500 bg-blue-500 bg-opacity-25 text-blue-500" : "text-gray-500 border-white hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-10" } border-l-4 text-lg px-3 py-2 font-medium cursor-pointer`}>
                                        <p>Offres</p>
                                    </div>
                                    <div onClick={() => { history.push('/products'); setNavbarOpen(false) }} className={`${(pathname.includes("/products")) ? "border-blue-500 bg-blue-500 bg-opacity-25 text-blue-500" : "text-gray-500 border-white hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-10" } border-l-4 text-lg px-3 py-2 font-medium cursor-pointer`}>
                                        <p>Produits</p>
                                    </div>
                                </div>
                                <div className="px-2 pt-1 border-t-2 pb-2">
                                    <div onClick={() => { history.push('/cart'); setNavbarOpen(false) }} className={`${(pathname.includes("/cart")) ? "border-blue-500 bg-blue-500 bg-opacity-25 text-blue-500" : "text-gray-500 border-white hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-10" } border-l-4 text-lg px-3 py-2 font-medium cursor-pointer flex justify-start space-x-2 items-center`}>
                                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                        <p>Panier</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Transition>
        </nav>
    )
}

export default Header
