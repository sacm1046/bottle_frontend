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
            <h3 className="text-center mb-4">COLLECTION</h3>
            <div className="row mx-auto">
                <Gallery limit={4} array={store.images} />
            </div>
            <div className="row justify-content-center my-5">
                <Link href="/collection">
                    <a
                        className="btn btn-danger "
                        onClick={() => actions.handleRoute('/bottles/category/1/0', {})}>SEE ALL</a>
                </Link>
            </div>


        </div>
    )
}

export default Collection