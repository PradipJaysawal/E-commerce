import React from 'react'
import Layout from '../common/Layout'
import Sidebar from '../common/Sidebar'
import { Link } from 'react-router-dom'

const Dashboard = () => {

    // const { logout } =useContext(AdminAuthContext);

  return (
    <Layout>
        {/* <h1>Dashboard</h1>
        <button className='btn btn-danger' onClick={logout}>Logout</button> */}

        <div className='container'>
          <div className='row'>
              <div className='d-flex justify-content-between mt-5 pb-3'>
                  <h4 className='h4 pb-0 mb-0'>Dashboard</h4>
              </div>
            <div className='col-md-3'>
                <Sidebar/>
            </div>

            <div className='col-md-9'>
              <div className='row'>
                <div className='col-md-4'>
                    <div className='card shadow'>
                        <div className='card-body'>
                          <h1>0</h1>
                          <span>Brands</span>
                        </div>
                        <div className='card-footer'>
                          <Link to="/admin/Brands">View Brands</Link>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card shadow'>
                        <div className='card-body'>
                          <h1>0</h1>
                          <span>Orders</span>
                        </div>
                        <div className='card-footer'>
                          <Link to="/admin/Orders">View Orders</Link>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card shadow'>
                        <div className='card-body'>
                          <h1>0</h1>
                          <span>Products</span>
                        </div>
                        <div className='card-footer'>
                          <Link to="/admin/Products">Products</Link>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 py-4'>
                    <div className='card shadow'>
                        <div className='card-body'>
                          <h1>0</h1>
                          <span>Categories</span>
                        </div>
                        <div className='card-footer'>
                          <Link to="/admin/categories">View Categories</Link>
                        </div>
                    </div>
                </div>

              </div>
              
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard