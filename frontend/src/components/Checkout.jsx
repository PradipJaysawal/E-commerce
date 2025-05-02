import React, { useContext, useState } from 'react'
import Layout from './common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import ProductImg from '../assets/images/mens/six.jpg'
import { CartContext } from './context/Cart'
import { useForm } from 'react-hook-form'
import { apiUrl  , userToken} from './common/http'
import { toast } from 'react-toastify'


const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const {cartData,grandTotal , subTotal , shipping} = useContext(CartContext);
    const navigate = useNavigate();
      const [loading , setLoading] = useState(true);

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }

     const {
          register,
          handleSubmit,
          watch,
          reset,
          setError,
          formState: { errors },
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

        const processOrder = (data) =>{
            console.log(data);
            if(paymentMethod == 'cod') {
                saveOrder(data, 'not paid')
            }
        }

        const saveOrder = (formData, paymentStatus) => {
            const newFormData = {...formData ,
                 grand_total: grandTotal(), 
                 sub_total: subTotal(),
                 shipping: shipping(),
                 disount: 0,
                 payment_status: paymentStatus,
                 status: 'pending',
                 cart: cartData
                }
            fetch(`${apiUrl}/save-order` , {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${userToken()}`
                },
                body: JSON.stringify( newFormData)
            }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    localStorage.removeItem('cart');
                    navigate(`/order/confirmation/${result.id}`)
                } else {
                    toast.error(result.message)
                }
            })
        }
  return (
    <Layout>

        <div className='container pb-5'>
            <div className='row'>
                <div className='col-md-12'>
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className='breadcrumb'>
                                <li className='breadcrumb-item'><Link to="/">Home</Link></li>
                                <li className='breadcrumb-item active' aria-current="page">Checkout</li>
                            </ol>
                        </nav>
                </div>
            </div>
            <form onSubmit={handleSubmit(processOrder)}>
            <div className='row'>
                
                <div className='col-md-7'>
                    <h3 className='border-bottom pb-3'><strong>Billing Details</strong></h3>
                   
                        <div className='row pt-3'>
                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input
                                    {
                                        ...register('name',{
                                            required:"The name field is required."
                                        }) 
                                    }
                                    type="text" 
                                    className={`form-control ${errors.name && 'is-invalid'}`}
                                    placeholder='Name' />
                                    {
                                        errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                    }
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input 
                                    {
                                        ...register('email',{
                                            required:"The email field is required.",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            } 
                                        }) 
                                    }
                                    type="text" 
                                    className={`form-control ${errors.email && 'is-invalid'}`}
                                     placeholder='Email' />
                                    {
                                        errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                    }
                                </div>
                            </div>

                            <div className='mb-3'>
                                <textarea 
                                {
                                    ...register('address',{
                                        required:"The address field is required."
                                    }) 
                                }
                                className={`form-control ${errors.address && 'is-invalid'}`}
                                rows={3} placeholder='Address'></textarea>
                                {
                                        errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>
                                    }
                            </div>

                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input 
                                     {
                                        ...register('city',{
                                            required:"The city field is required."
                                        }) 
                                    }
                                    type="text" 
                                    className={`form-control ${errors.city && 'is-invalid'}`}
                                    placeholder='City' />
                                     {
                                        errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>
                                    }
                                </div>
                               
                            </div>

                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input 
                                    {
                                        ...register('state',{
                                            required:"The state field is required."
                                        }) 
                                    }
                                    type="text" 
                                    className={`form-control ${errors.state && 'is-invalid'}`} 
                                    placeholder='State' />
                                    {
                                        errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>
                                    }
                                </div>
                                
                            </div>

                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input 
                                     {
                                        ...register('zip',{
                                            required:"The zip field is required."
                                        }) 
                                    }
                                    type="text"
                                    className={`form-control ${errors.zip && 'is-invalid'}`} 
                                    placeholder='Zip' />
                                    {
                                        errors.zip && <p className='invalid-feedback'>{errors.zip?.message}</p>
                                    }
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input 
                                     {
                                        ...register('mobile',{
                                            required:"The mobile number is required."
                                        }) 
                                    }
                                    type="text" 
                                    className={`form-control ${errors.mobile && 'is-invalid'}`}  
                                    placeholder='Mobile' />
                                    {
                                        errors.mobile && <p className='invalid-feedback'>{errors.mobile?.message}</p>
                                    }
                                </div>
                            </div>
                            
                        </div>                  
                </div>

                <div className='col-md-5'>
                    <h3 className='border-bottom pb-3'><strong>Items</strong></h3>
                    <table className='table'>
                            <tbody>
                                {
                                    cartData && cartData.map(item=> {
                                        return (
                                            <tr key={`cart-${item.id}`}>
                                    <td width={100}>
                                        <img src={item.image_url} width={80} alt="" />
                                    </td>
                                    <td width={600}>
                                        <h4>{item.title}</h4>
                                        <div className='d-flex align-items-center'>
                                            <span>Rs.{item.price}</span>
                                            <div className='ps-3'>
                                            {
                                                item.size && <button className='btn btn-size'>{item.size}</button>
                                            }
                                            </div>
                                            <div className='ps-5'>X {item.qty}</div>
                                        </div>
                                    </td>
                                </tr>
                                        )
                                    })
                                }
                            </tbody>
                    </table>

                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='d-flex justify-content-between border-bottom pb-2'>
                                <div>Sub-Total</div>
                                <div>Rs. {subTotal()}</div>
                            </div>

                            <div className='d-flex justify-content-between border-bottom py-2'>
                                <div>Shipping</div>
                                <div>Rs.{shipping()}</div>
                            </div>

                            <div className='d-flex justify-content-between border-bottom py-2'>
                                <div><strong>Grand Total</strong></div>
                                <div>Rs.{grandTotal()}</div>
                            </div>

                            
                        </div>
                    </div>

                    <h3 className='border-bottom pt-4 pb-3'><strong>Payment Method</strong></h3>
                    <div className='pt-2'>
                        <input type="radio" onClick={handlePaymentMethod} defaultChecked={paymentMethod == 'e-sewa'} value={'e-sewa'} />
                        <label htmlFor="" className='form-label ps-2'>E-sewa</label>

                        <input type="radio" onClick={handlePaymentMethod} defaultChecked={paymentMethod == 'cod'} value={'cod'} className='ms-3' />
                        <label htmlFor="" className='form-label ps-2'>Cash on Delivery</label>
                    </div>
                        <div className='d-flex py-3'>
                                <button className='btn btn-primary'>Pay Now</button>
                        </div>
                </div>
               
            </div>
            </form>
        </div>
    </Layout>
  )
}

export default Checkout
