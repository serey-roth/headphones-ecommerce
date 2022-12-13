import { useState, useContext, createContext, useEffect } from 'react'

import { toast } from 'react-hot-toast'

const StateContext = createContext({});

export const StateContextProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    
    useEffect(() => {
        const localData = get();
        
        setCartItems(localData.cart);
        setTotalPrice(localData.totalPrice);
        setTotalQuantities(localData.totalQuantities);
    }, [])

    let index = -1;

    const toggleCartItemQuantity = (id, value) => {
        if (index === -1)
            index = cartItems.findIndex(item => item._id === id);

        let newCartItems = [...cartItems];
        let newPrice = totalPrice;
        let newQuantities = totalQuantities;

        if (value === 'inc') {
            newCartItems[index].quantity += 1;
            newPrice += newCartItems[index].price;
            newQuantities += 1;
        } else {
            if (newCartItems[index].quantity > 1) {
                newCartItems[index].quantity -= 1;
                newPrice -= newCartItems[index].price;
                newQuantities -= 1;
            }
        }
        
        setCartItems(newCartItems);
        setTotalPrice(newPrice);
        setTotalQuantities(newQuantities);

        save(newCartItems, newPrice, newQuantities);
    }

    const onAdd = (product, quantity) => {
        const newPrice = totalPrice + product.price * quantity;
        const newQuantities = totalQuantities + quantity;

        const isInCart = cartItems.find(item => item._id === product._id);
        let updatedCartItems;
        
        if (!isInCart) {
            product.quantity = quantity;
            updatedCartItems = [
                ...cartItems,
                product,
            ];
        } else {
            updatedCartItems = cartItems.map(item => {
                if (item._id === product._id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity,
                    }
                }
            })
        }

        setCartItems(updatedCartItems);
        setTotalPrice(newPrice);
        setTotalQuantities(newQuantities);

        save(updatedCartItems, newPrice, newQuantities);

        toast.success(`${quantity} ${product.name} added to the cart.`);
    }

    const onToggleCart = () => {
        setShowCart(prevShowCart => !prevShowCart);
        index = -1;
    }

    const onRemove = (id) => {
        const item = cartItems.find(item => item._id === id);

        if (item) {
            const newPrice = totalPrice - product.price * quantity;
            const newQuantities = totalQuantities - quantity;


            const updatedCartItems = cartItems.filter(item => item._id !== id);
            setCartItems(updatedCartItems);
            setTotalPrice(newPrice);
            setTotalQuantities(newQuantities);

            save(updatedCartItems, newPrice, newQuantities);

            index === -1;
        }
    }

    const onRestart = () => {
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);

        save([], 0, 0);
    }

    return (
        <StateContext.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            onAdd,
            onToggleCart,
            toggleCartItemQuantity,
            onRemove,
            onRestart,
        }}>
            {children}
        </StateContext.Provider>
    )
}

const saveToLocalStorage = (label, data) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(label, JSON.stringify(data));
    }
    }
    

const getFromLocalStorage = (label, fallback) => {
    if (typeof window !== 'undefined') {
        const storage = window.localStorage.getItem(label);
        if (storage) return JSON.parse(storage);
        else return fallback;
    }
}

const save = (cart, totalPrice, totalQuantities) => {
    saveToLocalStorage('cart', cart);
    saveToLocalStorage('total-price', totalPrice);
    saveToLocalStorage('total-quantities', totalQuantities);
}

const get = () => {
    const cart = getFromLocalStorage('cart', []);
    const totalPrice = getFromLocalStorage('total-price', 0);
    const totalQuantities = getFromLocalStorage('total-quantities', 0);

    return {
        cart,
        totalPrice,
        totalQuantities
    }
}

export const useStateContext = () => useContext(StateContext);