import { useEffect, useContext } from 'react'
import { Context } from '../store/appContext'
import Link from 'next/link'
import Gallery from './Gallery'

const Exchange = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.GETBottlesExchange('/bottles/category/1/1')
    }, [actions])
    return (
        <div className="container">
            <h3 className="text-center my-4">{store.ln_selection ? store.ln.home_page_exchange_title.es : store.ln.home_page_exchange_title.en}</h3>
            <div className="row mx-auto" style={{minHeight:"250px"}}>
                <Gallery limit={4} array={store.ln_selection ? store.imagesExchange_es : store.imagesExchange} />
            </div>
            <div className="row justify-content-center my-5">
                <Link href="/collection">
                    <a
                        className="btn btn-danger"
                        onClick={() => actions.handleRoute('/bottles/category/1/1', store.categories[0])}>{store.ln_selection ? store.ln.home_button_see_all.es : store.ln.home_button_see_all.en}</a>
                </Link>
            </div>
        </div>
    )
}

export default Exchange