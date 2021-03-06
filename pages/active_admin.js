import { useEffect, useContext, useState } from 'react'
import { Context } from '../store/appContext'
import { confirmAlert } from 'react-confirm-alert'

const AciveAdmin = props => {
    const { store, actions } = useContext(Context)
    const [ image, setImage ] = useState('')
    const handleChange = e => {
        let img = document.getElementById(e.target.id)
        setImage(img.value)
    }
    useEffect(() => {
        actions.isAuthenticated()
        if (!store.isAuth) {
            actions.noAuth('/admin')
        } else {
            actions.GETBottles('/bottles/category/1/0')
            actions.GETCategories('/categories/0')
        }
    }, [actions, store.isAuth])

    return (
        <>
            <div className="container">



                <div className="row mt-3">
                    <div className={`col-md-6 ${JSON.stringify(store.currentCategory) !== '{}' && 'd-none'}`}></div>
                    <div className={`col-md-6 ${JSON.stringify(store.currentCategory) === '{}' && 'd-none'}`}>
                        <h2>Create Collection</h2>
                        <div style={{ color: "green", position: "absolute", top: "257px", left: "100px" }}>{store.post_bottle_msg && store.post_bottle_msg}</div>
                        <div>
                            <form>
                                <div className="form-group d-flex">
                                    <label htmlFor="file" className="btn btn-success">Select your photography here</label>
                                    <div className='ml-3 align-self-center'>{image&&image}</div>
                                    <input type="file" id="file" className="d-none" onChange={e=>handleChange(e)}/>
                                </div>
                            </form>

                            <div className="form-group">
                                <label htmlFor="country">Country English</label>
                                <input id="country" className="form-control" type="text" name="country" onChange={(e) => actions.handleChange(e)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="country_esp">Country Spanish</label>
                                <input id="country_esp" className="form-control" type="text" name="country_esp" onChange={(e) => actions.handleChange(e)} />
                            </div>

                            <button className="btn btn-success" onClick={() => {

                                if (document.getElementById('file').value === "") {

                                    confirmAlert({
                                        customUI: ({ onClose }) => {
                                            return (
                                                <div className='customUI'>
                                                    <p>Select a photography</p>
                                                    <button className="btn btn-info" onClick={onClose}>OKEY</button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                                else {
                                    if (store.country === "") {
                                        confirmAlert({
                                            customUI: ({ onClose }) => {
                                                return (
                                                    <div className='customUI'>
                                                        <p>Write a country description</p>
                                                        <button className="btn btn-info" onClick={onClose}>OKEY</button>
                                                    </div>
                                                )
                                            }
                                        })
                                    } else {
                                        actions.POSTFile('/file')
                                        setImage('')
                                    }
                                }
                            }
                            }>Submit</button>
                        </div>
                        <hr className="d-md-none" />
                    </div>

                    <div className="col-md-6">
                        <div className=" d-flex justify-content-around">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    CATEGORIES </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={() => actions.GETBottles('/bottles/category/1/0')} href="#">ALL</a>
                                    {
                                        store.categories.length > 0 && store.categories.map((category) => (
                                            <a key={category.id} onClick={() => actions.GETBottles(`/bottles/category/${category.id}/1`, category)} className="dropdown-item" href="#">{category.name}</a>
                                        ))
                                    }
                                </div>
                            </div>
                            <button className="btn btn-info" onClick={() => actions.logout()}>LOGOUT</button>
                        </div>

                    </div>

                </div>
                <hr />
                <div className="row justify-content-center">
                    <h3>{JSON.stringify(store.currentCategory) === '{}' ? "ALL" : store.currentCategory.name}</h3>
                </div>
                <div className="row">
                    <div className="card-deck">
                        {
                            store.bottles.length > 0 &&
                            store.bottles.map((item, i) => {
                                return (
                                    <div key={i} className="col-sm-12 col-md-4 col-lg-3">

                                        <div className="card my-2">

                                            <img className="card-img-top" src={item.image} alt="NotFound" />
                                            <div className="card-body">
                                                <p className="card-text">{item.country}</p>
                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-primary"
                                                    onClick={() => confirmAlert({
                                                        customUI: ({ onClose }) => {
                                                            return (
                                                                <div className='customUI'>
                                                                    <h4>Are you sure?</h4>
                                                                    <p>You want to delete this file?</p>
                                                                    <div className='btn-group'>
                                                                        <button className="btn-info" onClick={onClose}>No</button>
                                                                        <button
                                                                            className="btn btn-primary"
                                                                            onClick={() => {
                                                                                actions.DELETEBottle(`/bottles/${item.id}`)
                                                                                actions.DELETEfile(`/file/delete/${item.image}`)
                                                                                onClose();
                                                                            }}
                                                                        >
                                                                            Yes, Delete it!
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default AciveAdmin