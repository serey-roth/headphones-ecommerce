import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { urlFor } from '../lib/client'

const FooterBanner = ({ 
    footerBanner: { discount, largeText1, largeText2, desc,
    saleTime, smallText, midText, product, buttonText, image } 
}) => {
    return (
        <div className="footer-banner-container">
            <div className="banner-desc">
                <div className="left">
                    <p>{discount}</p>
                    <h3>{largeText1}</h3>
                    <h3>{largeText2}</h3>
                    <p>{saleTime}</p>
                </div>
                <div className="right">
                    <p>{smallText}</p>
                    <p>{midText}</p>
                    <p>{desc}</p>
                    <Link href={`/products/${product}`}>
                        <button type="button">{buttonText}</button>
                    </Link>
                </div>
                <Image
                    src={urlFor(image)?.url()} 
                    width={500}
                    height={500}
                    className="footer-banner-image" 
                    alt="footer-image" />
            </div>
        </div>
    )
}

export default FooterBanner