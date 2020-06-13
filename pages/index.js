import Jumbotron from '../components/Jumbotron'
import Collection from '../components/Collection'
import Exchange from '../components/Exchange'
import Contact from '../components/Contact'
import Layout from '../components/Layout'

const Index = () => {
    return (
        <Layout>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <Jumbotron />
                </div>
            </div>

            <div className="container-fluid p-0 m-0 py-4">
                <Collection />
            </div>

            <div className="container-fluid p-0 m-0 py-4" style={{ backgroundColor: "#f2f2f2" }}>
                <Exchange />
            </div>

            <div className="container" id="contact">
                <div className="row justify-content-center">
                    <Contact />
                </div>
            </div>
            
        </Layout>
    )
}


export default Index