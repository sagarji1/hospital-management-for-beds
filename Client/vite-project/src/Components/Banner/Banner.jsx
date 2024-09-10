import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Define the carousel images
const images = [
  {
    src: 'https://cdn.pixabay.com/photo/2020/03/05/16/58/hospital-4904920_1280.jpg',
    alt: 'First slide',
    caption: 'Discover the best Products in Delhi NCR'
  },
  {
    src: 'https://cdn.pixabay.com/photo/2020/04/16/15/39/medical-5051148_960_720.jpg',
    alt: 'Second slide',
    caption: 'Explore our collection of products'
  },
  {
    src: 'https://cdn.pixabay.com/photo/2016/11/06/10/35/hospital-1802680_1280.jpg',
    alt: 'Third slide',
    caption: 'Get the best deals on our products'
  }
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

// Custom arrow components
const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        background: 'none', // Remove the background
        border: 'none', // Remove the border
        padding: '10px',
        cursor: 'pointer',
        zIndex: 10,
        color: 'white', // Arrow color
        display: 'flex', // Center the icon inside the button
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ArrowBackIosIcon style={{ fontSize: '30px' }} />
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        background: 'none', // Remove the background
        border: 'none', // Remove the border
        padding: '10px',
        cursor: 'pointer',
        zIndex: 10,
        color: 'white', // Arrow color
        display: 'flex', // Center the icon inside the button
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ArrowForwardIosIcon style={{ fontSize: '30px' }} />
    </button>
  );
};

function Banner() {
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={300}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
    >
      {images.map((image, index) => (
        <div key={index} style={{ height: "600px", width: "100%", marginTop:"10px", borderRadius:'20px', position: 'relative' }}>
          <img
            src={image.src}
            alt={image.alt}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover"
            }}
          />
          <h3 style={{ color: "white", position: "absolute", bottom: "20px" }}>{image.caption}</h3>
        </div>
      ))}
    </Carousel>
  );
}

export default Banner;
