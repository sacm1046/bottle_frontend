import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../store/appContext'
import Link from 'next/link'

const Navigation = () => {
    const [home, setHome] = useState(true)
    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.GETCategories('/categories')
    }, [actions])
    return (
        <>
            <div className="fake">
                <style jsx>{`
                    .fake{
                        background-color: red;
                        height: 66px;
                    }
                `}</style>
            </div>

            <nav className="navbar navbar-light bg-light navbar-expand-lg fixed-top">
                <div className="container">


                    {/* Logo */}
                    <a href="/" className="navbar-brand">
                        {store.ln_selection ? store.ln.navbar_title_home.es : store.ln.navbar_title_home.en}
                    </a>


                    {/* Hamburger Icon */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarcollapseid">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    {/* Mobile Menu */}
                    <div className="collapse navbar-collapse" id="navbarcollapseid" >
                        <ul className="navbar-nav d-lg-none">

                            <li className="nav-item">
                                <Link href="/collection">
                                    <a className="nav-link" onClick={() => actions.handleRoute(`/bottles/category/1/1`, { id: 1, name: "EXCHANGE/TRADE" })}>Trade<small> & </small>Exchange</a>
                                </Link>
                            </li>


                            <li className="nav-item">
                                {/* eslint-disable-next-line */}
                                <a className="nav-link" data-toggle="collapse" data-target="#dropdown">Categories</a>
                                <div className="collapse navbar-collapse" id="dropdown">
                                    <ul className="navbar-nav" style={{ overflowY: "auto", height: "300px" }}>
                                        <li className="nav-item">
                                            <Link href="/collection">
                                                <a className="nav-link" onClick={() => actions.handleRoute('/bottles/category/1/0', {})}>All</a>
                                            </Link>
                                        </li>

                                        {
                                            store.categories.length > 0 && store.categories.map((category) => {
                                                if (category.name !== "EXCHANGE/TRADE") {
                                                    return (
                                                        <li className="nav-item" key={category.id}>
                                                            <Link href="/collection">
                                                                <a className="nav-link" onClick={() => actions.handleRoute(`/bottles/category/${category.id}/1`, category)}>{category.name}</a>
                                                            </Link>
                                                        </li>
                                                    )
                                                }
                                                return null
                                            }
                                            )
                                        }
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <Link href="/#cont">
                                    <a className="nav-link">Contact</a>
                                </Link>
                            </li>

                        </ul>
                    </div>


                    {/* Desktop Menu */}
                    <ul className="navbar-nav ml-auto d-none d-lg-flex">
                        <li className="nav-item">
                            <a className="nav-link" href="/collection" onClick={() => actions.handleRoute(`/bottles/category/1/1`, { id: 1, name: "EXCHANGE/TRADE" })}>TRADE<small> & </small>EXCHANGE</a>
                        </li>


                        <li className="nav-item dropdown">
                            {/* eslint-disable-next-line */}
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" data-target="#dropdownDesktop" id="navbarDropdown">CATEGORIES</a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="nav-link" href="/collection" onClick={() => actions.handleRoute('/bottles/category/1/0', {})}>ALL</a>


                                {
                                    store.categories.length > 0 && store.categories.map((category) => {
                                        if (category.name !== "EXCHANGE/TRADE") {
                                            return (
                                                <a className="nav-link" href="/collection" onClick={() => actions.handleRoute(`/bottles/category/${category.id}/1`, category)}>{category.name}</a>
                                            )
                                        }
                                        return null
                                    })
                                }
                            </div>
                        </li>
                        <li className="nav-item">
                            <a href="/#contact" className="nav-link">CONTACT</a>
                        </li>


                        {/* Language options */}
                        {/* <li className="nav-item dropdown">

                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" data-target="#dropdownDesktop" id="navbarDropdownLanguage">
                                <span>Lenguaje</span>
                            </a>
                            
                            <div className="dropdown-menu">
                                <a className="nav-link" href="#" onClick={()=>actions.change_language(true)}>English</a>
                            </div>
                            
                            <div className="dropdown-menu">
                                <a className="nav-link" href="#" onClick={()=>actions.change_language(false)}>Español</a>
                            </div>
                        </li> */}
                        <li className="nav-item align-self-center">
                            <button onClick={()=>actions.change_language(true)} type="button" className="ml-4 rounded-pill btn btn-danger mr-1 border-0 ">es</button>
                            <button onClick={()=>actions.change_language(false)} type="button" className="ml-1 rounded-pill btn btn-outline-secondary">en</button>
                        </li>
                    </ul>


                </div>

                {/* Styles Navbar */}
                <style jsx>{`
                    a{
                        color: rgba(0,0,0,0.8);
                        transition: color 400ms ease-in-out;
                    }
                    a:hover{
                        color: rgba(32, 18, 18, 1);
                        text-decoration: none;
                        cursor: pointer;
                    }
                    .dropdown-menu{
                        top: 45px;
                        padding: 0;
                        border-radius: 0;
                        border: 0;
                        animation: fadeIn ease-out 350ms;

                    }
                    @keyframes fadeIn {
                        0% {opacity:0;}
                        100% {opacity:1;}
                    }
                    .dropdown-menu > a{
                        color: #6c757d;
                        padding: 10px;
                        background-color: rgba(249, 249, 249, 1);  
                        transition: all 350ms ease-in-out;
                    }
                    .dropdown-menu > a:active{
                        background-color: rgba(249, 249, 249, 1);
                    }
                    .dropdown-menu > a:hover{
                        background-color: rgba(243, 243, 243, 1);
                    }
                    .navbar-toggler, .navbar-toggler:active{
                        border: 0 !important; 
                        outline: 0 !important;
                        background-color: rgba(249, 249, 249, 1);
                        transition: all 350ms ease-in-out;
                    }
                    .navbar-toggler:hover{
                        background-color: rgba(243, 243, 243, 1);
                    }
                `}</style>
            </nav>
        </>
    )
}
export default Navigation


