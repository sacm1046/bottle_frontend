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
            bottlesupadate: [],
        },
        actions: {
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
            logout: (route) => {
                setStore({
                    isAuth: false,
                    currentAdmin: {}
                })
                sessionStorage.removeItem('isAuth')
                sessionStorage.removeItem('currentAdmin')
                Router.push(route)
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