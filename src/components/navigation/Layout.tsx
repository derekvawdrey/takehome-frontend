import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'


function Layout() {
  return (
    <>
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <Outlet />
      </div>
    </>
  )
}

export default Layout