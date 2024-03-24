import React from 'react'
import DashboredHeader from '../DashboredHeader/DashboredHeader';
import { Outlet, useLocation } from 'react-router-dom';
import FixedRoute from '../FixedRoute';

export default function RouteOutlet({ title = "", route = "" }) {
  const { pathname } = useLocation()

  return (
    <section className='grow'>
      <DashboredHeader />
      <h1 className='font-semibold text-3xl px-10 my-10 text-fuchsia-800'>{title}</h1>
      {pathname.endsWith(route) ? <FixedRoute route={route} /> : <Outlet />}
    </section>

  )
}
