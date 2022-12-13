import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

import { Layout } from '../components'
import { StateContextProvider } from '../context/StateContext'

function MyApp({ Component, pageProps }) {
    return (
        <StateContextProvider>
            <Layout>
                <Toaster />
                <Component {...pageProps} />
            </Layout>
        </StateContextProvider>
    )
}

export default MyApp
