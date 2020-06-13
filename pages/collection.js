import { useEffect, useContext } from 'react'
import { Context } from '../store/appContext'
import Gallery from '../components/Gallery'
import Layout from '../components/Layout'

const FilterBottles = () => {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.isRoute()
        actions.GETBottles(store.route, store.currentCategory)
    }, [actions, store])
    return (
        <Layout>
            <h2 className="text-center my-4">MY COLLECTION</h2>
            <div className="container">
                <h4 className="text-center">{JSON.stringify(store.currentCategory) === '{}' ? "ALL" : store.currentCategory.name}</h4>
                <div className="row">
                    <Gallery limit={1000} array={store.images} />
                </div>
            </div>
        </Layout>
    )
}
export default FilterBottles