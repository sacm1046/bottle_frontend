import { useEffect, useState, useContext } from 'react'
import { Context } from '../store/appContext'
import swal from 'sweetalert'

const Contact = () => {
    const { actions } = useContext(Context)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [validName, setValidName] = useState('')
    const [validPhone, setValidPhone] = useState('')
    const [validEmail, setValidEmail] = useState('')
    const [validMessage, setValidMessage] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (validName === 'is-valid' && validEmail === 'is-valid' && validPhone === 'is-valid' && validMessage === 'is-valid') {
            actions.POSTEmail('/sendemail', name, email, phone, message)
            swal({
                title: "Message send",
                icon: "success",
                button: "OK",
                timer: 5000
            });
            resetForm()
        }
    }
    const resetForm = () => {
        setName('')
        setPhone('')
        setEmail('')
        setMessage('')
        setValidName('')
        setValidPhone('')
        setValidEmail('')
        setValidMessage('')
    }
    const handleChange = e => {
        if (e.target.name === 'name') {
            setName(e.target.value)
            !name || name.length < 2 ? setValidName('is-invalid') : setValidName('is-valid')
        }
        if (e.target.name === 'phone') {
            setPhone(e.target.value)
            !phone || phone.length < 5 ? setValidPhone('is-invalid') : setValidPhone('is-valid')
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value)
            !email || !email.includes('@') || !email.includes('.') || email.length < 2 ? setValidEmail('is-invalid') : setValidEmail('is-valid')
        }
        if (e.target.name === 'message') {
            setMessage(e.target.value)
            !message || message.length < 3 ? setValidMessage('is-invalid') : setValidMessage('is-valid')
        }
    }
    return (
        <>
            <div className="row my-5 justify-content-around">
                <div className="col-md-4">
                    <h1>CONTACT ME</h1>
                    <h2 className="grey-text" style={{color: "grey"}}>IF YOU HAVE SOME QUESTIONS ABOUT MY MINIATURE BOTTLE</h2>
                    <h1>COLLECTION</h1>
                </div>
                <form className="col-md-5" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                    {/*     <label htmlFor="exampleFormControlInput1">Name</label> */}
                        <input id="exampleFormControlInput1" type="text" className={`${validName} form-control`} value={name} name="name" onChange={(e) => handleChange(e)} placeholder="Name" />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="exampleFormControlInput2">Telephone</label> */}
                        <input id="exampleFormControlInput2" type="number" className={`${validPhone} form-control`} value={phone} name="phone" onChange={(e) => handleChange(e)} placeholder="Telephone"/>
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="exampleInputEmail1">Email</label> */}
                        <input id="exampleInputEmail1" type="email" className={`${validEmail} form-control`} value={email} name="email" onChange={(e) => handleChange(e)} placeholder="Email"/>
                    </div>
                    <div className="form-group">
                       {/*  <label htmlFor="exampleFormControlTextarea1">Message</label> */}
                        <textarea id="exampleFormControlTextarea1" className={`form-control ${validMessage}`} value={message} name="message" rows="3" onChange={(e) => handleChange(e)} placeholder="Message"></textarea>
                    </div>
                    <button className="btn btn-danger" type="submit" name="action">SEND</button>
                </form>
            </div>

        </>
    )
}
export default Contact