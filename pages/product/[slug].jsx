import React, { useState } from 'react'
import Image from 'next/image';
import { AiOutlinePlus, AiOutlineMinus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client'
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const [qty, setQty] = useState(0);

    const {  onAdd, onToggleCart } = useStateContext();

    const increaseQuantity = () => {
        setQty(prevQty => prevQty + 1);
    }

    const decreaseQuantity = () => {
        setQty(prevQty => {
            if (prevQty > 1) return prevQty - 1;
        });
    }

    const handleBuyNow = () => {
        let quantity = qty;
        if (quantity === 0) quantity += 1;
        onAdd(product, quantity);

        onToggleCart();
    }
    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <Image
                        width={250}
                        height={250}
                        src={urlFor(image && image[index]).url()}
                        alt="product-image" 
                        quality={100}
                        className="product-detail-image" />
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => 
                        (<Image
                        key={i}
                        width={100}
                        height={100}
                        src={urlFor(item).url()}
                        alt="small-product-image"
                        onMouseEnter={() => setIndex(i)}
                        className={i === index ? 
                            'small-image selected-image' 
                            : 'small-image'}
                        />))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p className="price">$ {price.toFixed(2)}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span 
                            className="minus"
                            onClick={decreaseQuantity}
                            >
                                <AiOutlineMinus />
                            </span>
                            <span className="num">{qty}</span>
                            <span 
                            className="plus"
                            onClick={increaseQuantity}
                            >
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button 
                        type="button"
                        className="add-to-cart"
                        onClick={() => onAdd(product, qty)}
                        disabled={qty === 0}>
                            Add to Cart
                        </button>
                        <button 
                        type="button"
                        className="buy-now"
                        onClick={handleBuyNow}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((product) =>
                        (<Product 
                            key={product._id}
                            product={product}
                            />))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`

    const products = await client.fetch(query);
    
    const paths = products.map(product => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params: { slug } }) {
    const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product"]`;

    const product = await client.fetch(productQuery);
    const products = await client.fetch(productsQuery);

    return {
        props: {
            product, 
            products,
        }
    }
}

export default ProductDetails