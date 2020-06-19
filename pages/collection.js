import { useEffect, useContext } from 'react'
import { Context } from '../store/appContext'
import Gallery from '../components/Gallery'
import Layout from '../components/Layout'
import Head from 'next/head'


const FilterBottles = () => {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.isRoute()
        actions.GETBottles(store.route, store.currentCategory)
    }, [actions, store])
    return (
        <Layout>
            <Head>
                <title>My Collection</title>
            </Head>
            <h2 className="text-center my-4">{store.ln_selection ? store.ln.link_from_navbar.es : store.ln.link_from_navbar.en}</h2>
            <div className="container">
                <h4 className="text-center">{JSON.stringify(store.currentCategory) === '{}' ? (store.ln_selection ? store.ln.navbar_all.es : store.ln.navbar_all.en) : (store.ln_selection ? store.currentCategory.name_esp: store.currentCategory.name)}</h4>
                <div className="row">
                    <Gallery limit={1000} array={store.ln_selection ? store.images_es : store.images} />
                </div>
            </div>
        </Layout>
    )
}
export default FilterBottles