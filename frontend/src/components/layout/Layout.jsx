import React from 'react'
import Navbar from './Navbar.jsx'
function Layout({children}) {
  return (
    <div className='min-h-screen bg-base-100'>

      <Navbar />
      <main className='min-w-7xl mx-auto py-5 px-4'>
        {children}
      </main>
    </div>
  )
}

export default Layout
