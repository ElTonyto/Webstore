import React, { useEffect, useState } from "react"
import { Redirect, useHistory } from "react-router"
import { oneProducts, allChildProductsByParentId, insertCart } from '../../api/ApiRequest';
import HeadTitle from "../header/HeadTitle"

type PropsType = {
    match: any
}

const ProductById: React.FC<PropsType> = ({ match }) => {
    const history = useHistory()
    const [id] = useState<string>(match.params.id)
    const [parent, setParent] = useState<any>(null)
    const [products, setProducts] = useState<Array<any>>([])
    const [selectedProducts, setSelectedProducts] = useState<any>(null)
    const [optionsProducts, setOptionsProducts] = useState<Array<any>>([])
    const [selectOptions, setSelectOptions] = useState<Array<any>>([])
    const [quantity, setQuantity] = useState<string>("1")
    const [redirect, setRedirect] = useState<boolean>(false)

    useEffect(() => {
        if (id !== undefined) {
            oneProducts(id).then(res => {
                if (res.data.status === "Success") {
                    setParent(res.data.data)
                    allChildProductsByParentId(id)
                    .then(res => {
                        setProducts(res.data.data)
                        setSelectedProducts(res.data.data[0])
                        setSelectOptions(res.data.data[0].options)
                        for (let i = 0; i < res.data.data.length; i++) {
                            const temp = optionsProducts
                            temp.push({
                                id: res.data.data[i].id,
                                options: res.data.data[i].options.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1)
                            })
                            setOptionsProducts(temp)
                        }
                    })
                } else {
                    setRedirect(true)
                }
            }).catch(err => {
                setRedirect(true)
            })
        }
    }, [id, optionsProducts])

    useEffect(() => {
        for (let i = 0; i < optionsProducts.length; i++) {
            let checkSame = true
            for (let j = 0; j < selectOptions.length; j++) {
                if (optionsProducts[i].options[j].option.trim() !== selectOptions[j].option.trim()) {
                    checkSame = false
                }
            }
            if (checkSame) {
                const changeProduct = products.filter((item) => item.id === optionsProducts[i].id)
                setSelectedProducts(changeProduct[0])
            }
        }
    }, [selectOptions, optionsProducts, products])

    const handlerSelectChange = (e: any, optionName: string) => {
        const value = e.target.value.trim()
        const arrTmp = selectOptions
        const newTmp = arrTmp.filter((item: any) => item.name !== optionName)
        newTmp.push({ name: optionName, option: value})
        const result = newTmp.sort((a,b) => (a.name > b.name) ? 1 : -1)
        setSelectOptions(result)
    }

    const renderOption = () => {
        return parent.allOptions.map((item: any, index: number) => {
            const options = item.option.split(",")
            const select = []
            for(let i = 0; i < options.length; i++) {
                select.push({
                    value: options[i],
                    label: options[i],
                    disabled: false,
                    hidden: false
                })
            }
            return (
                <div key={index} className="mt-2">
                    <p>{item.name}</p>
                    <select defaultValue={item.name} onChange={(e) => handlerSelectChange(e, item.name)} className="w-full bg-white my-0.5 px-2 py-3 text-lg border border-gray-300 rounded-md font-medium outline-none cursor-pointer">
                        {select.map((item: { value: string, label: string, disabled?: boolean, hidden?: boolean }) => {
                            return (
                                <option key={item.value} value={item.value.trim()} disabled={item.disabled} hidden={item.hidden}>{item.label}</option>
                            )
                        })}
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

    const addCart = () => {
        if (selectedProducts !== null) {
            insertCart({ type: "product", typeId: selectedProducts.id, quantity: quantity })
            .then(() => history.push("/cart"))
        }
    }

    if (redirect) {
        return (
            <Redirect to={{ pathname: "/not-found" }} />
        )
    }

    if (parent !== null && selectedProducts !== null) {
        const priceArr = selectedProducts.price.split(".")
        return (
            <>
                <HeadTitle title={parent.name} />
                <div className="flex justify-between mt-2 mb-4 py-4">
                    <div className="w-2/3">
                        <img className="w-8/12" src={selectedProducts.img} alt={selectedProducts.name} />
                    </div>
                    <div className="w-2/4 flex flex-col">
                        <div className="flex justify-between items-center">
                            <h2 className="font-medium text-2xl">{selectedProducts.name}</h2>
                            <span className="flex text-orange-500 font-medium"><p className="text-4xl pb-2">{priceArr[0]}</p><sup className="text-lg mt-2">€{priceArr[1]}</sup></span>
                        </div>
                        <p className={`${selectedProducts.remainingStock > 0 ? "text-green-500" : "text-red-500"} font-medium text-lg mt-2`}>{selectedProducts.remainingStock > 0 ? "En stock !" : "Pas de stock"}</p>
                        <p className="text-gray-700 mt-2">{selectedProducts.description}</p>
                        <div>
                            {renderOption()}
                            <div className="mt-2">
                                <p>Quantité</p>
                                <select defaultValue={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full bg-white my-0.5 px-2 py-3 text-lg border border-gray-300 rounded-md font-medium outline-none cursor-pointer">
                                    {renderQuantity()}
                                </select>
                            </div>
                        </div>
                        <button onClick={() => addCart()} className={`${selectedProducts.remainingStock > 0 ? "bg-blue-500 text-white cursor-pointer" : "bg-gray-500 cursor-not-allowed"} text-white text-lg py-3 text-lg w-full font-medium rounded mt-7`}>Ajouter au panier</button>
                    </div>
                </div>
            </>
        )
    }

    return null
}

export default ProductById