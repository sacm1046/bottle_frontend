import { useEffect, useContext } from 'react'
import { Context } from '../store/appContext'
import OurBrand from '../components/OurBrand'
import Gallery from '../components/Gallery'
import Container from '../components/Container'

const FilterBottles = () => {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.isRoute()
        actions.GETBottles(store.route, store.currentCategory)
    }, [actions, store])
    return (
        <Container>
            <div className="row mt-3 justify-content-center">
                <h2>MY COLLECTION</h2>    
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <h4>{JSON.stringify(store.currentCategory) === '{}' ? "ALL" : store.currentCategory.name}</h4>
                </div>
                <div className="row">
                    <Gallery limit={1000} array={store.images} />
                </div>
            </div>
        </Container>
    )
}
export default FilterBottles