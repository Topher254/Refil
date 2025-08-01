import { ShoppingBasket, X } from 'lucide-react';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { BsCart, BsSearch } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { UseAppContext } from '../../context/context';
import profile from '../../assets/profile.png'

const Navbar = () => {
const [open, setOpen] = useState(false);
const {user,setUser,showUserLogin,setShowUserLogin,navigate} = UseAppContext();
// logout func
const logout = async()=>{
    setUser(null);
    navigate('/')
}

  return (
        
            <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
    
                <NavLink to='/' onClick={()=>{setOpen(false)}} className='font-bold'>
                    Refil
                </NavLink>
    
                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-8">
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/'>Products</NavLink>
                    <NavLink to='/'>Contact</NavLink>
    
                    <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                        <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                      <BsSearch/>
                    </div>
    
                    <div onClick={()=>{navigate("/cart")}} className="relative cursor-pointer">
                    <BsCart />
                        <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
                    </div>
    
                    {!user ?(
                    <button onClick={()=>{setShowUserLogin(true)}} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Login
                    </button>)
                    :
                    (
                        <div className='relative group'>
                                <img src={profile} className='w-8 h-8 rounded-full p-1 hover:cursor-pointer' alt='profileimage'/>
                                <ul className='hidden group-hover:block w-40 absolute top-8 right-0 bg-white shadow border-gray-200 py-2.5 px-3 rounded-md text-sm z-40'>
                                    <li onClick={()=>{navigate('my-orders')}} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                                    <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                                </ul>
                        </div>
                    )}
                </div>
    
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {open ?  <X/> :<HiMenuAlt3 size={20}/>}
                </button>
    
                {/* Mobile Menu */}
                {open &&(
                    <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] z-40 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to='/' onClick={()=>{setOpen(false)}}>Home</NavLink>
                    <NavLink to='/products' onClick={()=>{setOpen(false)}}>Products</NavLink>
                    {user &&
                    <NavLink to='/orders' onClick={()=>{setOpen(false)}}>My Orders</NavLink>

                    }
                    {!user ?(
                        <button onClick={()=>{
                            setOpen(false);
                            setShowUserLogin(true);
                        }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Login
                    </button>
                    ):(<button
                    onClick={logout}
                    className="cursor-pointer px-6 py-2 mt-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full text-sm">
                        Logout
                    </button>)}
                    
                </div>)}
    
            </nav>
        )
    }

export default Navbar