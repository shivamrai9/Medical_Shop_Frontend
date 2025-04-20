import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)

  console.log("user dashboard",user)
  return (
    <section className="bg-white-800 dark:bg-gray-900">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr]">
        {/** Left for menu */}
        <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r border-neutral-700 dark:border-gray-800">
          <UserMenu />
        </div>

        {/** Right for content */}
        <div className="bg-white dark:bg-gray-800 min-h-[75vh] p-2">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Dashboard
