import { useEffect, useContext } from 'react'
import { Context } from '../store/appContext'
import Link from 'next/link'
import Gallery from './Gallery'

const Collection = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.GETBottles('/bottles/category/1/0')
    }, [actions]) 
    return (
        <div className="container">
            <h3 className="text-center mb-4">{store.ln_selection ? store.ln.home_page_collection_title.es : store.ln.home_page_collection_title.en}</h3>
            <div className="row mx-auto" style={{minHeight:'250px'}}>
                <Gallery limit={4} array={store.ln_selection ? store.images_es : store.images} />
            </div>
            <div className="row justify-content-center my-5">
                <Link href="/collection">
                    <a
                        className="btn btn-danger "
                        onClick={() => actions.handleRoute('/bottles/category/1/0', {})}>{store.ln_selection ? store.ln.home_button_see_all.es : store.ln.home_button_see_all.en}</a>
                </Link>
            </div>


        </div>
    )
}

export default Collection