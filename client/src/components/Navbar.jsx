import {useState} from "react";
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import { Link } from "react-router-dom";
import logo from '../../images/dynamics.png'
//Navigation bar components 
//Function that handles the props for the Nav item 
const NavItem=({title,classProps})=>{
    return(
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
};

const Navbar=()=>{
    const[toggleMenu, setToggleMenu]=useState(false);


    return(
        <nav className='w-full flex md:justify-start justify-between items-center p-4 '>
            <div className='md:flex-[0.5] flex-initial justify-start items-start'>
                <img src={logo} alt="logo" className='w-20 cursor-pointer'/>
            </div>
            <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial '>
                {[<Link to="/Home">Home</Link>,<Link to="/Transactions">Transactions</Link>,<Link to="/About">About</Link>].map((item,index)=>(
                    <NavItem key={item+index} title={item}/>
                 ))}
                <li className='bg-[#636c98] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#606fbe]'><Link to="/Login">REQUEST FOR A LOAN</Link></li>
                <li className="bg-[#636c98] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#606fbe]"><Link to="/Login2">REPAY BACK A LOAN</Link></li>
            </ul>
            <div className="flex relative">
                    {toggleMenu? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={()=>setToggleMenu(false)}/>:
                    <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={()=>setToggleMenu(true)}/>}
                    {toggleMenu &&(
                        <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                             flex flex-col justify-start items-end rounded-md white-glassmorphism text-white animate-slide-in" >
                            <li className="text-xl w-full my-2">
                                <AiOutlineClose onClick={()=>setToggleMenu(false)}/>
                            </li>
                            {[<Link to="/Home">Home</Link>,<Link to="/Transactions">Transactions</Link>,<Link to="/About">About</Link>].map((item,index)=>(
                                 <NavItem key={item+index} title={item} classProps='my-2 text-lg'/>
                    
                            ))}

                            <li className='bg-[#636c98] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#606fbe]'><Link to="/Login">REQUEST FOR A LOAN</Link></li>
                            <li className="bg-[#636c98] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#606fbe]"><Link to="/Login2">REPAY BACK A LOAN</Link></li>

                        </ul>


                    )}


                </div>

        </nav>

    )

}

export default Navbar;