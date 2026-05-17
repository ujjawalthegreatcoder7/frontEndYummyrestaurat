import Footer from "../Components/Footer";
import "./pages.css";
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

const Home = () => {
    return (
        <>
            <div className=" back text-gray-800">

                <div className="top">
                    <div>
                        <div>
                            <b>Enjoy Your Healthy Delicious Food</b>
                        </div>

                        <div>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam
                            </p>
                        </div>

                        <div className="button-group">
                            <a href="/menu" className="menu-btn">Order From Menu</a>
                                <a
                                  href="https://api.whatsapp.com/send?phone=919971289376"
                                  target="_blank"
                                  className="book-btn"
                                  rel="noopener noreferrer"
                                >  Contact Us
                                </a>
                            
                        </div>
                    </div>

                    <div>
                        <img src="/bannerimage.png" alt="Delicious Food" className="hero-img" />
                    </div>
                </div>
            </div>


            <div className="gallery-section">
                <div className="our" >
                    <p className="gallery-subtitle">Our Gallery</p>

                    <b className="gallery-title">Gallery of Our Cooked Food</b></div>

                <div className="gallery-grid">
                    <img src="/menuitem3.png" alt="Food Item" className="ourgallery" />
                    <img src="/menuitem2.png" alt="Food Item" className="ourgallery" />
                    <img src="/menuitem4.png" alt="Food Item" className="ourgallery" />
                    <img src="/menuitem6.png" alt="Food Item" className="ourgallery" />
                </div>
            </div>

<div className="back testimonials-section">
  <div className="testi-header">
    <p className="testi-subtitle">Testimonials</p>
    <b className="testi-title">What Are They Saying About Us</b>
  </div>

  <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">

    <div className="carousel-inner">

      <div className="carousel-item active">
        <div className="testimonial-card">
          <img src="/modiji.jpg" className="testimonial-img" alt="Narendra Modi" />
          <h3>Narendra Modi</h3>
          <p>"An unforgettable dining experience with divine flavors and exceptional hospitality."</p>
        </div>
      </div>

      <div className="carousel-item">
        <div className="testimonial-card">
          <img src="/akshay.jpg" className="testimonial-img" alt="Akshay Kumar" />
          <h3>Akshay Kumar</h3>
          <p>"Healthy, delicious, and perfectly crafted meals. Truly inspiring!"</p>
        </div>
      </div>

      <div className="carousel-item">
        <div className="testimonial-card">
          <img src="/ambani.jpg" className="testimonial-img" alt="Mukesh Ambani" />
          <h3>Mukesh Ambani</h3>
          <p>"Premium quality food with remarkable service. A world-class restaurant."</p>
        </div>
      </div>

    </div>

    {/* Controls */}
    <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon"></span>
    </button>

    <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon"></span>
    </button>

  </div>
</div>
            {/* Why Choose Section */}
            <div className="why-section">
                <div className="why-left">
                    <h2>Why Choose Yummy</h2>
                    <p>
                        At Yummy, we believe food is more than just a meal — it’s an experience.
                        We serve freshly prepared dishes using premium ingredients.
                    </p>

                </div>

                <div className="why-card">
                    <div className="iconcircle">
                    </div>
                    <h3>Fresh & Premium Ingredients</h3>
                    <p>
                        We use only high-quality fresh ingredients to ensure every dish delivers
                        exceptional taste.
                    </p>
                </div>

                <div className="why-card">
                    <div className="iconcircle">
                        <i className="bi bi-award-fill"></i>
                    </div>
                    <h3>Exceptional Service Quality</h3>
                    <p>
                        Our team is dedicated to providing world-class hospitality, quick service,
                        and a dining experience.
                    </p>
                </div>

                <div className="why-card">
                    <div className="iconcircle">
                        <i className="bi bi-emoji-smile-fill"></i>
                    </div>
                    <h3>Customer Happiness First</h3>
                    <p>
                        Your satisfaction is our top priority, with delicious meals, cozy
                        ambiance.
                    </p>
                </div>
            </div>            
        </>
    );
};

export default Home;