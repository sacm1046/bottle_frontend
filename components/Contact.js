import { useState, useContext, useRef } from 'react'
import { Context } from '../store/appContext'
import swal from 'sweetalert'

const Contact = () => {
    const firstRef = useRef(null)
    const { actions, store } = useContext(Context)
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
                title: store.ln_selection ? store.ln.sweet_alert.es : store.ln.sweet_alert.en,
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
    const handleChange = (e, value) => {
        if (e.target.name === 'name') {
            setName(value)
            !name || name.length < 2 ? setValidName('is-invalid') : setValidName('is-valid')
        }
        if (e.target.name === 'phone') {
            setPhone(value)
            !phone || phone.length < 5 ? setValidPhone('is-invalid') : setValidPhone('is-valid')
        }
        if (e.target.name === 'email') {
            setEmail(value)
            !email || !email.includes('@') || !email.includes('.') || email.length < 2 ? setValidEmail('is-invalid') : setValidEmail('is-valid')
        }
        if (e.target.name === 'message') {
            setMessage(value)
            !message || message.length < 3 ? setValidMessage('is-invalid') : setValidMessage('is-valid')
        }
    }
    return (
        <>
            <div className="row my-5 justify-content-around px-3 px-md-0">
                <div className="col-md-4 align-self-center">
                    <h1>{store.ln_selection ? store.ln.home_contact_me_first_h1.es : store.ln.home_contact_me_first_h1.en}</h1>
                    <h2 className="grey-text" style={{ color: "grey" }}>{store.ln_selection ? store.ln.home_contact_me_h2.es : store.ln.home_contact_me_h2.en}</h2>
                    <h1>{store.ln_selection ? store.ln.home_contact_me_second_h1.es : store.ln.home_contact_me_second_h1.en}</h1>
                </div>
                <div className="col-md-5">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">{store.ln_selection ? store.ln.home_contact_name.es : store.ln.home_contact_name.en}</label>
                            <input id="exampleFormControlInput1" type="text" className={`${validName} form-control`} value={name} name="name" onChange={(e) => handleChange(e, e.target.value)} onBlur={(e) => handleChange(e, e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput2">{store.ln_selection ? store.ln.home_contact_phone.es : store.ln.home_contact_phone.en}</label>
                            <input id="exampleFormControlInput2" type="number" className={`${validPhone} form-control`} value={phone} name="phone" onChange={(e) => handleChange(e, e.target.value)} onBlur={(e) => handleChange(e, e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">{store.ln_selection ? store.ln.home_contact_email.es : store.ln.home_contact_email.en}</label>
                            <input id="exampleInputEmail1" type="text" className={`${validEmail} form-control`} value={email} name="email" onChange={(e) => handleChange(e, e.target.value)}  onBlur={(e) => handleChange(e, e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">{store.ln_selection ? store.ln.home_contact_message.es : store.ln.home_contact_message.en}</label>
                            <textarea id="exampleFormControlTextarea1"  className={`form-control ${validMessage}`} value={message} name="message" rows="3" onChange={(e) => handleChange(e, e.target.value)}  onBlur={(e) => handleChange(e, e.target.value)}></textarea>
                        </div>
                        <button className="btn btn-danger" type="submit" name="action">{store.ln_selection ? store.ln.home_contact_button_send.es : store.ln.home_contact_button_send.en}</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Contact