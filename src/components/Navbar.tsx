import TemporaryDrawer from './ui/drawer'
import DashboardBtn from './ui/DashboardBtn'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
      <div>
          <nav className='p-5  flex items-center justify-between px-8 lg:px-12 z-40 fixed left-0 right-0 top-0 bg-black/[0.3] backdrop-blur-md'> {/* Added bg-black for clarity */}
              <div>
                  <Link to='/'><h2 className='text-white text-2xl lg:text-4xl font-bold'>Coin<span className='text-themeColor'>X</span></h2></Link>
              </div>
              <div className='items-center hidden md:flex'>
                  <ul className='text-white flex items-center gap-10'>
                      <li className='cursor-pointer'><Link className='hover:text-gray-200' to="/">Home</Link></li>
                      <li className='cursor-pointer'><Link className='hover:text-gray-200' to="/latest_news">News</Link></li>
                      <li className='cursor-pointer'><Link className='hover:text-gray-200' to="/compare">Compare</Link></li>
                      <li className='cursor-pointer'><Link className='hover:text-gray-200' to="/saved">Saved</Link></li>
                      <li className='cursor-pointer'><Link className='hover:text-gray-200' to="/dashboard"><DashboardBtn/></Link></li>
                  </ul>
              </div>
              <TemporaryDrawer/>
          </nav>
      </div>
    )
  }
  

export default Navbar
 