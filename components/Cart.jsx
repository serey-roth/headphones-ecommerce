import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

import { AiOutlinePlus, AiOutlineMinus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'

const Cart = () => {
    const cartRef = useRef();
    const { 
        totalPrice, 
        totalQuantities,
        cartItems,
        onToggleCart,
        toggleCartItemQuantity,
        onRemove,
    } = useStateContext();


    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        })

        if (response.status === 500) return;
        
        const data = await response.json();

        toast.loading('Redirecting...');

        stripe.redirectToCheckout({ sessionId: data.id });
    }

    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button 
                type="button"
                className="cart-heading"
                onClick={onToggleCart}>
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className="cart-num-items">({totalQuantities})</span>
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button
                            type="button"
                            onClick={onToggleCart}
                            className="btn">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map(product => (
                        <div className="product" key={product._id}>
                            <Image 
                                src={urlFor(product?.image[0]).url()}
                                alt="product-image"
                                quality={100}
                                width={150}
                                height={150}/>
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{product.name}</h5>
                                    <h4>$ {product.price.toFixed(2)}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span
                                                className="minus"
                                                onClick={() => 
                                                    toggleCartItemQuantity(product._id, 'dec')}
                                            >
                                                <AiOutlineMinus />
                                            </span>
                                            <span className="num">{product.quantity}</span>
                                            <span
                                                className="plus"
                                                onClick={() => 
                                                    toggleCartItemQuantity(product._id, 'inc')}
                                            >
                                                <AiOutlinePlus />
                                            </span>
                                        </p>
                                    </div>

                                    <button 
                                    type="button"
                                    onClick={() => onRemove(product._id)}
                                    className="remove-item">
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>$ {totalPrice.toFixed(2)}</h3>
                        </div>
                        <div style={{
                            width: "100%",
                        }}>
                            <button
                            type="button"
                            className="btn"
                            onClick={handleCheckout}>
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart