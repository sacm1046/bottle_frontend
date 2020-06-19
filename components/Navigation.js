import React, { useEffect, useContext } from 'react'
import { Context } from '../store/appContext'

const Navigation = () => {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.GETCategories('/categories/1')
        actions.isSelectedLanguage()
    }, [actions])
    return (
        <>
            <div className="fake">
                <style jsx>{`
                    .fake{
                        background-color: white;
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

                            {/* Language options */}
                            <li className="nav-item d-flex justify-content-around p-0 my-3">
                                <button onClick={() => actions.change_language(true)} type="button" className={`rounded-pill btn ${store.ln_selection ? 'btn-danger border-0' : 'btn-outline-secondary'}`}>es</button>
                                <button onClick={() => actions.change_language(false)} type="button" className={`rounded-pill btn ${!store.ln_selection ? 'btn-danger border-0' : 'btn-outline-secondary'}`}>en</button>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/collection" onClick={() => actions.handleRoute(`/bottles/category/1/1`, { id: 1, name: "EXCHANGE/TRADE", name_esp:"INTECAMBIO" })}>{store.ln_selection ? store.ln.navbar_title_tarde_exchange.es : store.ln.navbar_title_tarde_exchange.en}</a>
                            </li>


                            <li className="nav-item">
                                {/* eslint-disable-next-line */}
                                <a className="nav-link" data-toggle="collapse" data-target="#dropdown">{store.ln_selection ? store.ln.navbar_title_categories.es : store.ln.navbar_title_categories.en}</a>
                                <div className="collapse navbar-collapse" id="dropdown">
                                    <ul className="navbar-nav" style={{ overflowY: "auto", height: "200px" }}>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/collection" onClick={() => actions.handleRoute('/bottles/category/1/0', {})}>{store.ln_selection ? store.ln.navbar_all.es : store.ln.navbar_all.en}</a>
                                        </li>
                                        {
                                            store.categories.length > 0 && store.categories.map((category) => (
                                                <li className="nav-item" key={category.id}>
                                                    <a className="nav-link" href="/collection" onClick={() => actions.handleRoute(`/bottles/category/${category.id}/1`, category)}>{store.ln_selection ?category.name_esp:category.name}</a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </li>


                            <li className="nav-item" data-toggle="collapse" data-target="#navbarcollapseid">
                                <a href="/#contact" className="nav-link">{store.ln_selection ? store.ln.navbar_title_contact.es : store.ln.navbar_title_contact.en}</a>
                            </li>


                            
                        </ul>
                    </div>


                    {/* Desktop Menu */}
                    <ul className="navbar-nav ml-auto d-none d-lg-flex">
                        <li className="nav-item">
                            <a className="nav-link" href="/collection" onClick={() => actions.handleRoute(`/bottles/category/1/1`, { id: 1, name: "EXCHANGE/TRADE", name_esp:"INTERCAMBIO" })}>{store.ln_selection ? store.ln.navbar_title_tarde_exchange.es : store.ln.navbar_title_tarde_exchange.en}</a>
                        </li>


                        <li className="nav-item dropdown">
                            {/* eslint-disable-next-line */}
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" data-target="#dropdownDesktop" id="navbarDropdown">{store.ln_selection ? store.ln.navbar_title_categories.es : store.ln.navbar_title_categories.en}</a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="nav-link" href="/collection" onClick={() => actions.handleRoute('/bottles/category/1/0', {})}>{store.ln_selection ? store.ln.navbar_all.es : store.ln.navbar_all.en}</a>
                                {
                                    store.categories.length > 0 && store.categories.map((category) => (
                                        <a key={category.id} className="nav-link" href="/collection" onClick={() => actions.handleRoute(`/bottles/category/${category.id}/1`, category)}>{store.ln_selection ?category.name_esp:category.name}</a>
                                    ))
                                }
                            </div>
                        </li>
                        <li className="nav-item">
                            <a href="/#contact" className="nav-link">{store.ln_selection ? store.ln.navbar_title_contact.es : store.ln.navbar_title_contact.en}</a>
                        </li>


                        {/* Language options */}
                        <li className="nav-item align-self-center">
                            <button onClick={() => actions.change_language(true)} type="button" className={`ml-4 rounded-pill btn mr-1 ${store.ln_selection ? 'btn-danger border-0' : 'btn-outline-secondary'}`}>es</button>
                            <button onClick={() => actions.change_language(false)} type="button" className={`ml-1 rounded-pill btn ${!store.ln_selection ? 'btn-danger border-0' : 'btn-outline-secondary'}`}>en</button>
                        </li>
                    </ul>


                </div>

                {/* Styles Navbar */}
                <style jsx>{`
                    a{
                        color: rgba(0,0,0,1);
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


