import { useContext } from 'react'
import { Context } from '../store/appContext'
import Head from 'next/head'
import Jumbotron from '../components/Jumbotron'
import Collection from '../components/Collection'
import Exchange from '../components/Exchange'
import Contact from '../components/Contact'
import OurBrand from '../components/OurBrand'
import Container from '../components/Container' 

const Index = () => {
    return (
        <Container>
            <div className="row">
                <div className="container-fluid">
                    <Jumbotron />
                </div>
            </div>


            <div className="row">
                <div className="container">
                    <Collection />
                </div>
            </div>

            <div className="row" style={{backgroundColor: "#f2f2f2"}}>
                <div className="container-fluid">
                    <Exchange />
                </div>
            </div>

            <div className="row">
                <div className="container">
                    <Contact />
                </div>
            </div>
        </Container>
    )
}


export default Index