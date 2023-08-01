import React, { useContext } from 'react'
import { AppContext } from '../app/app'



function Cart() {

    const [productState, setProductState] = useContext(AppContext);

    return (
        <div>{productState.products.length}</div>
    )
}

export default Cart