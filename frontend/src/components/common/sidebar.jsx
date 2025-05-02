import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth';
import { Link, useNavigate } from 'react-router-dom';

const sidebar = () => {
    const {logout} = useContext(AdminAuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
      logout();            // clear state & localStorage
      navigate('/account/login'); // ✅ redirect to login page
    };
  return (
    <div className='card shadow mb-5 sidebar'>
            <div className='card-body p-4'>
                <ul>
                    <li>
                    <a href="">Dashboard</a>
                    </li>
                    <li>
                    <Link to="/admin/categories">Categories</Link>
                    </li>
                    <li>
                    <Link to="/admin/Brands">Brands</Link>
                    </li>
                    <li>
                    <Link to="/admin/Products">Products</Link>
                    </li>
                    <li>
                    <Link to="/admin/Orders">Orders</Link>
                    </li>
                    <li>
                    <a href="">Users</a>
                    </li>
                    <li>
                    <Link to="/admin/shipping">Shipping</Link>
                    </li>
                    <li>
                    <a href="">Change Password</a>
                    </li>
                    <li>
                    <li><a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a></li>
                    </li>
                </ul>
            </div>
    </div>
  )
}

export default sidebar
