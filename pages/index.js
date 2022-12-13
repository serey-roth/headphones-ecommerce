import { client } from '../lib/client'

import { Product, FooterBanner, HeroBanner } from '../components'

const Home = ({ products, bannerData }) => {
    return (
        <>
            <HeroBanner
                heroBanner={bannerData.length && bannerData[0]} />

            <div className="products-heading">
                <h2>Best Selling Product</h2>
                <p>Speakers of many variations</p>
            </div>

            <div className="products-container">
                {products?.map((product) => (
                    <Product
                        key={product._id}
                        product={product} />
                ))}
            </div>

            <FooterBanner footerBanner={bannerData.length && bannerData[0]}/>
        </>
    )
}

export async function getServerSideProps() {
    // Make a query for Sanity to request all products
    const productQuery = '*[_type == "product"]';

    // Make a query for Sanity to request all banners
    const bannerQuery = '*[_type == "banner"]';

    const products = await client.fetch(productQuery);
    const bannerData = await client.fetch(bannerQuery);

    return {
        props: {
            products,
            bannerData,
        }
    }
}

export default Home