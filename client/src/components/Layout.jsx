import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
// This serve as the main layout of the Dapp, the NavBar, Content and the Footer 
const Layout=()=>{
    return (
        <>
          <Navbar />
          <Outlet />
          <Footer/>
          
        </>
      );

};
export default Layout;