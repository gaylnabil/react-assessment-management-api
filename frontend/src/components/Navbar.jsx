import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>

                <div className="collapse navbar-collapse" id="navbarSupportedProduct">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={`nav-link ${(isActive) => (isActive ?? "active")}`} aria-current="page" to="/">Companies</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${(isActive) => (isActive ?? "active")}`} aria-current="page" to="wholesalers">Wholesalers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${(isActive) => (isActive ?? "active")}`} aria-current="page" to="orders">Orders</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
