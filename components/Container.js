import Navigation from './Navigation'

const Container = ({children}) => {
    return(
        <>
        <Navigation />
        {children}
        </>
    )
}
export default Container