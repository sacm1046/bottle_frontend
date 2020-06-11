import { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import Container from '../components/Container'

const Admin = props => {
    const { store, actions } = useContext(Context)

    const handleSubmit = (e) => {
        e.preventDefault()
        actions.POSTLogin()
    }
    return (
        <Container>
            <div className="container">
                <div className="row my-5 justify-content-center">
                    <div className="col-md-5">
                        <form className="form-group" onSubmit={e => handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword3">Password</label>
                                <input className="form-control" id="exampleInputPassword3" type="password" name="password" onChange={e => actions.handleChange(e)} />
                                <small style={{ color: "red", position:"absolute", top:"37px", left:"29px" }}>{store.error && store.error}</small>
                            </div>
                            <button className="btn btn-info">LogIn</button>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default Admin