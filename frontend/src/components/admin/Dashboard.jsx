import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Sidebar from '../common/Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    brands: 0,
    orders: 0,
    products: 0,
    categories: 0,
  });

  useEffect(() => {
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
  const token = adminInfo ? adminInfo.token : null;
  
  if (!token) {
    console.error('No token found');
    return;
  }

  axios.get('http://localhost:8000/api/dashboard-counts', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => setCounts(res.data))
  .catch(err => console.error('Error fetching counts:', err));
}, []);

  const chartData = [
    { name: 'Brands', value: counts.brands },
    { name: 'Orders', value: counts.orders },
    { name: 'Products', value: counts.products },
    { name: 'Categories', value: counts.categories },
  ];

  const barColors = ['#007bff', '#28a745', '#ffc107', '#dc3545']; // Blue, Green, Yellow, Red

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='d-flex justify-content-between mt-5 pb-3'>
            <h4 className='h4 pb-0 mb-0'>Dashboard</h4>
          </div>
          <div className='col-md-3'>
            <Sidebar />
          </div>

          <div className='col-md-9'>
            {/* Count Cards */}
            <div className='row'>
              {[
                { title: 'Brands', count: counts.brands, link: '/admin/Brands' },
                { title: 'Orders', count: counts.orders, link: '/admin/Orders' },
                { title: 'Products', count: counts.products, link: '/admin/Products' },
                { title: 'Categories', count: counts.categories, link: '/admin/categories' }
              ].map((item, index) => (
                <div key={index} className='col-md-6 py-2'>
                  <div className='card shadow'>
                    <div className='card-body'>
                      <h1>{item.count}</h1>
                      <span>{item.title}</span>
                    </div>
                    <div className='card-footer'>
                      <Link to={item.link}>View {item.title}</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div className='card my-4'>
              <div className='card-body'>
                <h5>Bar Chart Overview</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value">
                      {chartData.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={barColors[index % barColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className='card my-4'>
              <div className='card-body'>
                <h5>Pie Chart Overview</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`slice-${index}`} fill={barColors[index % barColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
