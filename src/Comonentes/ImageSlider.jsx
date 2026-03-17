import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ImageSlider = ({ images }) => {

    return (

        <Swiper spaceBetween={10} slidesPerView={1}>

            {images.map((img, index) => (

                <SwiperSlide key={index}>

                    <img
                        src={img}
                        className="w-full h-80 object-cover"
                    />

                </SwiperSlide>

            ))}

        </Swiper>

    );

};

export default ImageSlider;