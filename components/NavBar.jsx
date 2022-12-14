import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './'
import { useStateContext } from '../context/StateContext'

const NavBar = () => {
    const { totalQuantities, showCart, onToggleCart } = useStateContext();

    return (
        <div className="navbar-container">
            <p className="logo">
                <Link href='/'>SRR Boat Headphones</Link>
            </p>

            <button 
            type="button"
            className="cart-icon"
            onClick={onToggleCart}>
                <AiOutlineShopping />
                <span className="cart-item-qty">
                    {totalQuantities}
                </span>
            </button>

            {showCart && <Cart />}
        </div>
    )
}

export default NavBar