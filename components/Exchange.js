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
        <>
            <div className="container">
                <div className="row my-5 justify-content-center">
                    <h3>EXCHANGE</h3>
                </div>
                <div className="row">
                    <Gallery limit={4} array={store.imagesExchange} />
                </div>
                <div className="row my-5 justify-content-center">
                    <Link href="/mycollection">
                        <a
                            className="btn btn-danger"
                            onClick={() => actions.handleRoute('/bottles/category/1/1', store.categories[0])}>SEE ALL</a>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Exchange