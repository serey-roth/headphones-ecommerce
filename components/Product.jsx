import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { urlFor } from '../lib/client'

const Product = ({ product: { image, name, slug, price } }) => {
    return (
        <div>
            <Link href={`/product/${slug.current}`}>
                <div className="product-card">
                    <Image
                        className="product-image"
                        src={urlFor(image && image[0])?.url()}
                        quality={100}
                        width={250}
                        height={250}
                        alt="product-image" />
                    <p className="product-name">{name}</p>
                    <p className="product-price">$ {price.toFixed(2)}</p>
                </div>
            </Link>
        </div>
    )
}

export default Product