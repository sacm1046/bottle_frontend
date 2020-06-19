import { useContext } from 'react'
import { Context } from '../store/appContext'

const OurBrand = () => {
    const { store } = useContext(Context)
    return (
        <>
            <p className="text-center py-2 m-0 mt-5" style={{ backgroundColor: "#f2f2f2" }}>{store.ln_selection ? store.ln.our_brand.es : store.ln.our_brand.en}</p>
        </>
    )
}
export default OurBrand