import React, { useState } from 'react'
import Layout from '../common/Layout'
import { Link } from 'react-router-dom'
import UserSidebar from '../common/UserSidebar'
import { useForm } from 'react-hook-form'
import { apiUrl, userToken } from '../common/http'
import { toast } from 'react-toastify'
import Loader from '../common/Loader'


const Profile = () => {

  const [loading , setLoading] = useState(true);

  const {
      register,
      reset,
      setError,
      handleSubmit,
      formState: {errors},
  } = useForm({
    defaultValues: async () => {
      fetch(`${apiUrl}/get-profile-details`,{
        method: 'GET',
        headers: {
          'Content-type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : `Bearer ${userToken()}`
        }
      })
      .then(res => res.json())
      .then(result => {
        setLoading(false)
         reset({
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
          address: result.data.address,
          city: result.data.city,
          state: result.data.state,
          zip: result.data.zip,
          mobile: result.data.mobile
         })
      })
    }
  });

  const updateAccount = async (data) => {
    fetch(`${apiUrl}/update-profile`,{
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${userToken()}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      if(result.status ==200) {
        toast.success(result.message);
      } else {
        const formErrors = result.errors;
        Object.keys(formErrors).forEach((field)=> {
          setError(field, {message: formErrors[field][0] });
      })
    }
    });
  }

  return (
    <Layout>
    <div className='container'>
     <div className='row'>
         <div className='d-flex justify-content-between mt-5 pb-3'>
             <h4 className='h4 pb-0 mb-0'>My Account</h4>
             {/* <Link to="" className="btn btn-primary">Button</Link> */}
         </div>
       <div className='col-md-3'>
           <UserSidebar/>
       </div>

       <div className='col-md-9'>
        {
          loading == true && <Loader/>
        }
         {
          loading == false && 
       
        <form onSubmit={handleSubmit(updateAccount)}>
          <div className='card shadow'>
              <div className='card-body p-4'>
                  <div className='row'>
                      <div className='mb-3 col-md-6'>
                          <label htmlFor="name" className='form-label'>Name</label>
                          <input 
                              {
                                ...register('name', {required: "The name field is required."})
                              }
                              type="text"
                              id='name' 
                              className={`form-control ${errors.name && 'is-invalid'}`} 
                              placeholder='Enter Your Name' />
                              {
                                errors.name && <p className='text-danger'>{errors.name?.message}</p>
                              }
                      </div>
                      <div className='mb-3 col-md-6'>
                          <label htmlFor="email" className='form-label'>Email</label>
                          <input
                           {
                              ...register('email',{
                                  required: "The email field is required",
                                  pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "Invalid email address"
                                  } 
                              })
                            }
                           type="text" className={`form-control ${errors.email && 'is-invalid'}`}
                            placeholder='Email' />
                            {
                                errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                            }
                      </div>
                  </div>

                  <div className='row'>
                      <div className='mb-3'>
                          <label htmlFor="address" className='form-label'>Address</label>
                          <textarea 
                          {
                            ...register('address', {required: "The address field is required."})
                          }
                          id="address" 
                          placeholder='Address' 
                          className={`form-control ${errors.address && 'is-invalid'}`}></textarea>
                          {
                              errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>
                          }
                      </div>
                  </div>

                  <div className='row'>
                      <div className='mb-3 col-md-6'>
                          <label htmlFor="mobile" className='form-label'>Mobile</label>
                          <input 
                          {
                            ...register('mobile', {required: "The mobile field is required."})
                          }
                          type="text" 
                          id='mobile' 
                          className={`form-control ${errors.mobile && 'is-invalid'}`} 
                          placeholder='Enter Your Mobile' />
                          {
                              errors.mobile && <p className='invalid-feedback'>{errors.mobile?.message}</p>
                          }
                      </div>
                      <div className='mb-3 col-md-6'>
                          <label htmlFor="city" className='form-label'>City</label>
                          <input
                          {
                            ...register('city', {required: "The city field is required."})
                          } 
                          type="text" 
                          id='city' 
                          className={`form-control ${errors.city && 'is-invalid'}`} 
                          placeholder='Enter City' />
                          {
                              errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>
                          }
                      </div>
                  </div>

                  <div className='row'>
                      <div className='mb-3 col-md-6'>
                          <label htmlFor="state" className='form-label'>State</label>
                          <input 
                          {
                            ...register('state', {required: "The state field is required."})
                          }
                          type="text" 
                          id='state' 
                          className={`form-control ${errors.state && 'is-invalid'}`}
                          placeholder='Enter State' />
                          {
                              errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>
                          }
                      </div>
                      <div className='mb-3 col-md-6'>
                          <label htmlFor="zip" className='form-label'>Zip</label>
                          <input 
                          {
                            ...register('zip', {required: "The zip field is required."})
                          }
                          type="text" 
                          id='zip' 
                          className={`form-control ${errors.zip && 'is-invalid'}`} 
                          placeholder='Enter Zip' />
                          {
                              errors.zip && <p className='invalid-feedback'>{errors.zip?.message}</p>
                          }
                      </div>
                  </div>

              </div>
          </div>

          <button className='btn btn-primary mt-4 mb-5'>Update</button>
        </form>
}
       </div>
     </div>
   </div>
</Layout>
  )
}

export default Profile
