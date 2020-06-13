import Router from 'next/router'

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            path: process.env.host,
            email: process.env.email,
            password: "",
            isAuth: false,
            error: "",
            success: "",
            currentAdmin: {},
            bottles: [],
            categories: [],
            exchange: [],
            currentFile: "",
            country: '',
            country_esp: '',
            currentCategory: {},
            show: false,
            route: '',
            images: [],
            imagesExchange: [],
            ln_selection: false, //false=spanish - true=english
            ln: {
                navbar_title_home: { en:'HOME',es:'INICIO'},
                navbar_title_tarde_exchange: { en:'Trade & Exchange',es:'Intercambio'},
                navbar_title_categories: { en:'Categories',es:'Categorías'},
                navbar_all: {en: "ALL", es: "TODAS"},
                navbar_title_contact: { en:'Contact',es:'Contacto'},
                home_page_collection_title: { en:'COLLECTION',es:'COLECCIÓN'},
                home_button_see_all: { en:'SEE ALL',es:'VER TODO'},
                home_page_exchange_title: { en:'EXCHANGE',es:'INTERCAMBIO'},
                home_contact_me_first_h1: { en:'CONTACT ME',es:'CONTÁCTAME'},
                home_contact_me_h2: { en:'IF YOU HAVE SOME QUESTIONS ABOUT MY MINIATURE BOTTLE',es:'SI TIENE CONSULTAS SOBRE MI COLECCIÓN DE BOTELLAS '},
                home_contact_me_second_h1: { en:'COLLECTION',es:'EN MINIATURA'},
                home_contact_name: {en: "Name", es: "Nombre"},
                home_contact_phone: {en: "Telephone", es: "Teléfono"},
                home_contact_email: {en: "Email", es: "Email"},
                home_contact_message: {en: "Message", es: "Mensaje"},
                home_contact_button_send: {en: "SEND", es: "ENVIAR"},
                our_brand: {en: 'Developed by Codeme - copyright 2020', es: 'Desarrollado por Codeme - copyright 2020'},
                link_from_navbar: {en: 'MY COLLECTION', es: 'MI COLECCIÓN'},
            }
        },
        actions: {
            change_language: condition => {
                setStore({
                    ln_selection: condition
                })
            },
            handleChange: e => {
                setStore({ [e.target.name]: e.target.value })
            },
            handleRoute: (route, object) => {
                sessionStorage.setItem('route', route)
                sessionStorage.setItem('currentCategory', JSON.stringify(object))

            },
            isRoute: () => {
                sessionStorage.getItem('route') && setStore({
                    route: sessionStorage.getItem('route'),
                    currentCategory: JSON.parse(sessionStorage.getItem('currentCategory'))
                })
            },
            create: (array, name) => {
                let images = []
                array.length > 0 &&
                    array.map((bottles, i) => {
                        let country = []
                        bottles.country.split(',').map(c => {
                            let b = {
                                value: c,
                                title: c
                            }
                            country.push(b)
                            return null
                        })
                        let a = {
                            src: bottles.image,
                            thumbnail: bottles.image,
                            thumbnailWidth: 120,
                            thumbnailHeight: 120,
                            caption: bottles.country,

                            tags: country
                        }
                        images.push(a)
                        return null
                    })
                setStore({ [name]: images })
            },
            //Authentication Fetch Methods///////////////////////////////////////
            noAuth: (route) => {
                Router.push(route)
            },
            logout: () => {
                setStore({
                    isAuth: false,
                    currentAdmin: {}
                })
                sessionStorage.removeItem('isAuth')
                sessionStorage.removeItem('currentAdmin')
                Router.push('/')
            },
            isAuthenticated: () => {
                if (sessionStorage.getItem('currentAdmin') && sessionStorage.getItem('isAuth')) {
                    setStore({
                        isAuth: sessionStorage.getItem('isAuth'),
                        currentAdmin: JSON.parse(sessionStorage.getItem('currentAdmin'))
                    })
                }
            },
            POSTLogin: async () => {
                const store = getStore()
                const res = await fetch(`${store.path}/login`, {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: store.email,
                        password: store.password
                    })
                })
                const data = await res.json()
                if (data.error) {
                    setStore({ error: data.error })
                    setTimeout(() => { setStore({ error: "" }) }, 2000)
                } else {
                    setStore({
                        isAuth: true,
                        error: '',
                        currentAdmin: data
                    })
                    console.log(data)
                    sessionStorage.setItem('isAuth', true)
                    sessionStorage.setItem('currentAdmin', JSON.stringify(data))
                    Router.push("/active_admin")
                }
            },
            //Categories Fetch Methods//////////////////////////////////////
            GETCategories: async route => {
                const store = getStore()
                const res = await fetch(`${store.path}${route}`, {
                    headers: {
                        'content-Type': 'application/json',
                        'Authorization': `Bearer ${store.currentAdmin.access_token}`
                    },
                })
                const data = await res.json()
                data.msg ? setStore({ error: data.msg }) : setStore({
                    categories: data,
                    error: ""
                })
            },
            //Bottles Fetch Methods//////////////////////////
            GETBottlesExchange: async route => {

                const store = getStore()
                const res = await fetch(`${store.path}${route}`)
                const data = await res.json()
                if (data.error) {
                    setStore({ error: data.error })
                } else {
                    setStore({ exchange: data, error: "" })
                    getActions().create(store.exchange, 'imagesExchange')
                }
            },
            GETBottlesUpdate: async (route) => {
                const store = getStore()
                const res = await fetch(`${store.path}${route}`)
                const data = await res.json()
                if (data.error) {
                    setStore({ error: data.error })
                } else {
                    setStore({ bottlesupadate: data, error: "" })
                }
            },
            PUTBottleUpdate: async (id, route) => {
                const store = getStore()
                const oldroute = route
                const newroute = oldroute.replace('http://localhost:5000', 'https://bottlecollection.herokuapp.com')
                console.log(newroute)
                const res = await fetch(`${store.path}/bottles/${id}`, {
                    method: 'PUT',
                    headers: {
                        'content-Type': 'application/json',
                        'Authorization': `Bearer ${store.currentAdmin.access_token}`
                    },
                    body: JSON.stringify({
                        image: newroute,
                    })
                })
                const data = await res.json()
                console.log(data)
            },
            GETBottles: async (route, object) => {
                const store = getStore()
                const res = await fetch(`${store.path}${route}`)
                const data = await res.json()
                if (data.error) {
                    setStore({ error: data.error })
                } else {
                    setStore({ bottles: data, error: "" })
                    object ? setStore({ currentCategory: object }) : setStore({ currentCategory: {} })
                    getActions().create(store.bottles, 'images')
                }
            },
            POSTBottle: async (route, img) => {
                await getActions().POSTFile('/file')
                const store = getStore()
                const res = await fetch(`${store.path}${route}`, {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json',
                        'Authorization': `Bearer ${store.currentAdmin.access_token}`
                    },
                    body: JSON.stringify({
                        image: store.path + img + store.currentFile,
                        country: store.country,
                        category_id: store.currentCategory.id,
                        country_esp: store.country_esp
                    })
                })
                const data = await res.json()
                if (data.error) {
                    setStore({
                        error: data.error,
                    })
                    console.log(data.error)

                } else {
                    getActions().GETBottles(`/bottles/category/${store.currentCategory.id}/1`, store.currentCategory)
                    document.getElementById("country").value = ''
                    document.getElementById("country_esp").value = ''
                    document.getElementById("file").value = ''
                    setStore({
                        country: "",
                        country_esp: ""

                    })

                }
            },
            DELETEBottle: async (route) => {
                const store = getStore()
                const res = await fetch(`${store.path}${route}`, {
                    method: 'DELETE',
                    headers: {
                        'content-Type': 'application/json',
                        'Authorization': `Bearer ${store.currentAdmin.access_token}`
                    },
                })
                const data = await res.json()
                if (data.success) {
                    if (JSON.stringify(store.currentCategory) === '{}') {
                        getActions().GETBottles('/bottles/category/1/0')
                    } else {
                        getActions().GETBottles(`/bottles/category/${store.currentCategory.id}/1`, store.currentCategory)
                    }
                }
            },
            //Files Fetch Methods///////////////////////////////////////////
            POSTFile: async (route) => {
                const store = getStore()
                let file = document.getElementById("file")
                let data = new FormData();
                data.append('file', file.files[0]);
                setStore({ currentFile: file.files[0].name })
                const res = await fetch(`${store.path}${route}`, {
                    method: 'POST',
                    body: data
                })
                await res.json()
            },
            DELETEfile: async (route) => {
                const store = getStore()
                let newroute = route
                let correctroute = newroute.replace('https://bottlecollection.herokuapp.com/file/', '/')
                console.log(correctroute)
                const res = await fetch(`${store.path}${correctroute}`, {
                    method: 'DELETE',
                    headers: {
                        'content-Type': 'application/json',
                        'Authorization': `Bearer ${store.currentAdmin.access_token}`
                    },
                })
                await res.json()
            },
            //Email Fetch Methods///////////////////////////////////////////            
            POSTEmail: async (route, name, from, phone, message) => {
                const store = getStore()
                const res = await fetch(`${store.path}${route}`, {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        from_email: from,
                        message: message,
                        phone: phone,
                    })
                })
                const data = await res.json()
                if (data.error) {
                    setStore({
                        error: data.error,
                    })
                }
            },
        }
    }
}
export default getState;