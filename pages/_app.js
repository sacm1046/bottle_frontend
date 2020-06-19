import injectContext from '../store/appContext'
import '../styles/styles.scss'
import Head from 'next/head'
import OurBrand from '../components/OurBrand'

const App = ({ Component, pageProps }) => (
    <>
        <Head>
            <title>Miniature Bottle Collection</title>
            <meta name="description" content="Miniature bottle collection with over hundreds of bottles to showcase and exchange from around the world. Feel free to contact me for more details." />
            <meta name="keywords" content="small bottles" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.0/simplex/bootstrap.min.css" />
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossOrigin="anonymous"></script>
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </Head>
        <Component {...pageProps} />
        <OurBrand />
    </>
)
export default injectContext(App);