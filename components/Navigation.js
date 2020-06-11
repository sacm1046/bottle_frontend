import { useEffect, useState, useContext } from 'react'
import { Context } from '../store/appContext'
import Link from 'next/link'

const Navigation = props => {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.GETCategories('/categories')
    }, [actions])
    return (
        <>
            <div className="fake"></div>
            <nav className="navbar navbar-light bg-light navbar-expand-lg fixed-top">
                <div className="container">


                    {/* Logo */}
                    <Link href="/"><a className="navbar-brand">HOME</a></Link>


                    {/* Hamburger Icon */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarcollapseid">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    {/* Mobile Menu */}
                    <div className="collapse navbar-collapse" id="navbarcollapseid">
                        <ul className="navbar-nav d-lg-none">

                            <li className="nav-item">
                                <Link href="/collection">
                                    <a className="nav-link" onClick={() => actions.handleRoute(`/bottles/category/1/1`, { id: 1, name: "EXCHANGE/TRADE" })}>Trade<small> & </small>Exchange</a>
                                </Link>
                            </li>


                            <li className="nav-item ">
                                {/* eslint-disable-next-line */}
                                <a className="nav-link" data-toggle="collapse" data-target="#dropdown">Categories</a>
                                <div className="collapse navbar-collapse" id="dropdown">
                                    <ul className="navbar-nav">
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
                            <Link href="/collection">
                                <a className="nav-link" onClick={() => actions.handleRoute(`/bottles/category/1/1`, { id: 1, name: "EXCHANGE/TRADE" })}>TRADE<small> & </small>EXCHANGE</a>
                            </Link>
                        </li>

                        <li className="nav-item dropdown">
                            {/* eslint-disable-next-line */}
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" data-target="#dropdownDesktop" id="navbarDropdown">CATEGORIES</a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link href="/collection">
                                    <a className="dropdown-item" onClick={() => actions.handleRoute('/bottles/category/1/0', {})}>ALL</a>
                                </Link>
                                {
                                    store.categories.length > 0 && store.categories.map((category) => {
                                        if (category.name !== "EXCHANGE/TRADE") {
                                            return (
                                                <Link href="/collection" key={category.id}>
                                                    <a className="dropdown-item" onClick={() => actions.handleRoute(`/bottles/category/${category.id}/1`, category)}>{category.name}</a>
                                                </Link>
                                            )
                                        }
                                        return null
                                    }
                                    )
                                }
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link href="/#cont">
                                <a className="nav-link">CONTACT</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navigation


