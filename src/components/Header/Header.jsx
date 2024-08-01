import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import images from '../../assets/images.jpeg'
import '../../index.css';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className='py-3 lg:sd z-50
     bg-[#bc382e] font-montserrat text-2xl overflow-hidden ' >
      <Container>
        <nav className='flex justify-between items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' /> 
            </Link>
            
            
          </div>
          <div className='lg:hidden'>
            <button onClick={() => setMenuOpen(!menuOpen)} className='text-white'>
              {menuOpen ===false ?'☰' : '❌'}
            </button>
          </div>
          <ul className={`flex-col lg:flex lg:flex-row lg:ml-auto ${menuOpen === true ? ' z-50 p-2 absolute top-20 right-[1%] text-center w-[100%] bg-[#1d2b34] rounded-3xl ' : 'hidden'} lg:block`}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='lg:inline-block'>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='text-white inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='lg:inline-block'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

