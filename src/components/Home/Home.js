import Products from '../Products/Products'
import './Home.css'
function Home() {
  return (
    <div className='hero'>
      <div className='card bg-dark text-white border-0'>
        <img
          className='card-img'
          src='./images/bg.jpg'
          alt='background image'
          height='900px'
        />
        <div className='card-img-overlay d-flex flex-column justify-content-center'>
          <div className='container'>
            <h5 className='card-title display-3 fw-bolder mb-0'>
              Rent From Competing Suppliers
            </h5>
            <p className='card-text lead fs-2'>Check Out All The Products</p>
          </div>
        </div>
      </div>
      <Products />
    </div>
  )
}

export default Home
