import React, { useContext, useEffect, useState } from 'react'
import Layout from './common/Layout'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Rating } from 'react-simple-star-rating'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { apiUrl } from './common/http';
import { CartContext } from './context/Cart';
import { toast } from 'react-toastify';

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4)
  const [product, setProduct] = useState([])
  const [productImages, setProductImages] = useState([])
  const [productSizes, setProductSizes] = useState([])
  const [sizeSelected, setSizeSelected] = useState(null)
  const params = useParams();
  const { addToCart } = useContext(CartContext)
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProduct = () => {
    fetch(`${apiUrl}/get-product/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Application': 'application/json',
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          setProduct(result.data)
          setProductImages(result.data.product_images)
          setProductSizes(result.data.product_sizes)
          fetchRelatedProducts(result.data.category_id, result.data.id);
        } else {
          console.log("Something went wrong");
        }
      })
  }

  const fetchRelatedProducts = (categoryId, currentProductId) => {
  fetch(`${apiUrl}/get-products-by-category/${categoryId}`)
    .then(res => res.json())
    .then(result => {
      if (result.status === 200) {
        const filtered = result.data.filter(p => p.id !== currentProductId);
        setRelatedProducts(filtered);
      }
    });
};

  const handleAddToCart =  () =>{
    if (productSizes.length >0){
      if (sizeSelected == null){
        toast.error("Please select a size")
      } else {
        addToCart(product , sizeSelected)
        toast.success("Product added to cart successfully")
      }
    } else {
      addToCart(product , null)
      toast.success("Product added to cart successfully")
    }
  }
  // useEffect(() => {
  //   fetchProduct()
  // }, [])
  useEffect(() => {
  fetchProduct()
}, [params.id])

  return (
    <Layout>
      <div className='container product-detail'>
        <div className='row'>
          <div className='col-md-12'>
            <nav aria-label="breadcrumb" className='py-4'>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'><Link to="/">Home</Link></li>
                <li className='breadcrumb-item'><Link to="/shop">Shop</Link></li>
                <li className='breadcrumb-item active' aria-current="page">{product.title}</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className='row mb-5'>
          <div className='col-md-5'>
            <div className='row'>
              <div className='col-2'>
                {productImages.length > 0 && (
                  <Swiper
                    style={{
                      '--swiper-navigation-color': '#000',
                      '--swiper-pagination-color': '#000',
                    }}
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    direction="vertical"
                    spaceBetween={10}
                    slidesPerView={6}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper mt-2"
                  >
                    {productImages.map((product_image, index) => (
                      <SwiperSlide key={index}>
                        <div className='content'>
                          <img
                            src={product_image.image_url}
                            alt=""
                            height={100}
                            className='w-100'
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              <div className='col-10'>
                {productImages.length > 0 && (
                  <Swiper
                    style={{
                      '--swiper-navigation-color': '#000',
                      '--swiper-pagination-color': '#000',
                    }}
                    loop={true}
                    spaceBetween={0}
                    navigation={true}
                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    {productImages.map((product_image, index) => (
                      <SwiperSlide key={index}>
                        <div className='content'>
                          <img
                            src={product_image.image_url}
                            alt=""
                            className='w-100'
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <h2>{product.title}</h2>
            <div>
              <Rating
                readonly
                size={20}
                initialValue={rating}
              />
              <span className='pt-1 ps-2'>10 Reviews</span>
            </div>
            <div className='price h3 py-3'>
              Rs.{product.price} &nbsp;
              {product.compare_price &&
                <span className='text-decoration-line-through'>Rs.{product.compare_price}</span>}
            </div>
            <div>
              {product.short_description}
            </div>
            <div className='pt-3'>
              <strong>Select Size</strong>
              <div className='sizes pt-2'>
                {
                    productSizes && productSizes.map(product_size => {
                        return (
                            <button
                            key={`p-size-${product_size.id}`}
                            onClick={()=> setSizeSelected(product_size.size.name)}
                            className={`btn btn-size me-2 ${sizeSelected == product_size.size.name ? 'active' : ''}` }>{product_size.size.name}</button>
                        )
                    })
                }
                
              </div>
            </div>
            <div className='add-to-cart my-4'>
              <button
              onClick={()=> handleAddToCart()}
              className='btn btn-primary text-uppercase'>Add To Cart</button>
            </div>
            <hr />
            <div>
              <strong>SKU: </strong>
              {product.sku}
            </div>
          </div>
        </div>
        <div className='row pb-5'>
          <div className='col-md-12'>
            <Tabs
              defaultActiveKey="description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="description" title="Description">
                <div dangerouslySetInnerHTML={{ __html:product.description }}>

                </div>
              </Tab>
              <Tab eventKey="reviews" title="Reviews (10)">
                Reviews Area
              </Tab>
            </Tabs>
                
                {relatedProducts.length > 0 && (
                  <div className="row pb-5 pt-3">
                    <div className="col-md-12">
                      <h2>Related Products</h2>
                      <div className="row">
                        {relatedProducts.map((item) => (
                          <div key={item.id} className="col-md-3 mb-4">
                            <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                              <div className="card h-100">
                                <img src={item.product_images?.[0]?.image_url} alt={item.title} className="card-img-top" />
                                <div className="card-body">
                                  <h5 className="card-title">{item.title}</h5>
                                  <p className="card-text">Rs.{item.price}</p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Product