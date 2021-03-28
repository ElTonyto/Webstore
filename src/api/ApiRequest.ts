import axios from "./axios"

// Catalogs
export const allCatalogs = () => axios.get("catalogs")
export const oneCatalog = (id: string) => axios.get(`catalogs/${id}`)

// Offers
export const allOffers = () => axios.get("offers")
export const oneOffer = (id: string) => axios.get(`offers/${id}`)

// Products
export const allProducts = () => axios.get("products")
export const allParentProducts = () => axios.get("products?isParent=true")
export const allChildProducts = () => axios.get("products?isParent=false")
export const oneProducts = (id: string) => axios.get(`products/${id}?allChild=false`)
export const allChildProductsByParentId = (id: string) => axios.get(`products/${id}?allChild=true`)