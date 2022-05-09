import { NavLink } from 'react-router-dom'
import { createReactNavLink } from '@milon27/react-sidebar'
import { BsGrid, BsPeople } from 'react-icons/bs'
import URL from '../../utils/URL'

const NavItems: (() => JSX.Element)[] = [
    createReactNavLink(NavLink, "Dashboard", URL.HOME, <BsGrid />),
    createReactNavLink(NavLink, "Accounts", URL.ACCOUNTS, <BsPeople />),
]

export default NavItems