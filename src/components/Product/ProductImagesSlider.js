import './product-image-slider.scss'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import { useState } from 'react'
import productService from '../../services/ProductService'
const ProductImagesSlider = (props) => {
  const [activeThumb, setActiveThumb] = useState()
  let mediaType = ''
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className='product-images-slider'
      >
        {props.images.map((item, index) => {
          mediaType = productService.checkMediaType(item)
          if (mediaType == 'image') {
            return (
              <SwiperSlide key={index}>
                <img src={item} alt='product images' />
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className='product-images-slider-thumbs'
      >
        {props.images.map((item, index) => {
          mediaType = productService.checkMediaType(item)
          if (mediaType == 'image') {
            return (
              <SwiperSlide key={index}>
                <div className='product-images-slider-thumbs-wrapper'>
                  <img src={item} alt='product images' />
                </div>
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
    </>
  )
}

ProductImagesSlider.propTypes = {
  images: PropTypes.array.isRequired,
}

export default ProductImagesSlider
