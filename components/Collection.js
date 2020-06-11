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
        <>
            <div className="row my-5">
                <div className="container text-center">
                    <h3>COLLECTION</h3>
                </div>
            </div>
            <div className="row">
                <Gallery limit={4} array={store.images} />
            </div>
            <div className="row my-5">
                <div className="container text-center">
                    <Link href="/mycollection"> 
                    <button 
                    className="btn btn-danger" 
                    onClick={() => actions.handleRoute('/bottles/category/1/0', {})}>SEE ALL</button>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default Collection