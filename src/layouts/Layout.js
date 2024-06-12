import Footer from "./Footer";
import Navigation from "./Navigation";

function Layout(props)
{
    return <>
        <Navigation/>
        <div>{props.children}</div>
        <Footer/>
        
    </>
}

export default Layout; 