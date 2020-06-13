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
            <h3 className="text-center my-4">EXCHANGE</h3>
            <div className="row mx-auto">
                <Gallery limit={4} array={store.imagesExchange} />
            </div>
            <div className="row justify-content-center my-5">
                <Link href="/collection">
                    <a
                        className="btn btn-danger"
                        onClick={() => actions.handleRoute('/bottles/category/1/1', store.categories[0])}>SEE ALL</a>
                </Link>
            </div>
        </div>
    )
}

export default Exchange