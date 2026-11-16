import "./Home.css";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  return (
    <div className="my-5">
      <Carousel className="home-carousel" interval={3000} pause={false}>
        <Carousel.Item className="g-3">
          <img
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
            alt=""
          />
          <Carousel.Caption>
            <h3>Tu proximo hogar comienza aqui</h3>
            <p>InnovaProp</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="g-3">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
            alt=""
          />

          <Carousel.Caption>
            <h3>Tu proximo hogar comienza aqui</h3>
            <p>InnovaProp</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="g-3">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
            alt=""
          />

          <Carousel.Caption>
            <h3>Tu proximo hogar comienza aqui</h3>
            <p>InnovaProp</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
