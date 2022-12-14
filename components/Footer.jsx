import React from 'react'
import Link from 'next/link'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
    return (
        <div className="footer-container">
            <p>2022 SRR Boat Headphones</p>
            <p className="icons">
                <AiFillInstagram />
                <AiOutlineTwitter />
            </p>
            <span>
                Asset Source: &nbsp;
                <Link href="https://www.boat-lifestyle.com/">
                    Boat Lifestyle
                </Link>
            </span>
        </div>
    )
}

export default Footer