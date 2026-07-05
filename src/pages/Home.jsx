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
                            <b>Light That Tells a Story.</b>
                        </div>

                        <div>
                            <p>
                                Discover premium 3D printed lamps and home décor crafted with precision,
                                sustainability, and timeless design. Every piece is thoughtfully made in
                                India to transform your space into something extraordinary.
                            </p>
                        </div>

                        <div className="button-group">
                            {/* <a href="/menu" className="menu-btn">Order From Menu</a> */}

                            <button className="menu-btn"
                                onClick={() =>
                                    window.location.href = "/menu"
                                }
                                style={{
                                    //   background: "#ffbd06",
                                    //   color: "black",
                                    //   border: "none",
                                    //   padding: "12px 20px",
                                    //   borderRadius: "10px",
                                    //   fontWeight: "bold",
                                    //   cursor: "pointer",
                                    //   fontSize: "16px",
                                }}
                            >     Explore Collection
                            </button>

                            <a
                                href="https://api.whatsapp.com/send?phone=919971289376"
                                target="_blank"
                                className="book-btn"
                                rel="noopener noreferrer"
                            >  Custom Orders
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
                    <p className="gallery-subtitle">Our Collection</p>

                    <b className="gallery-title">Crafted Layer by Layer with Precision</b></div>

                <div className="gallery-grid">
                    <img src="/lamp1.png" alt="Food Item" className="ourgallery" />
                    <img src="/lamp2.png" alt="Food Item" className="ourgallery" />
                    <img src="/lamp3.png" alt="Food Item" className="ourgallery" />
                    <img src="/lamp4.png" alt="Food Item" className="ourgallery" />
                </div>
            </div>

            <div className="back testimonials-section">
                <div className="testi-header">
                    <p className="testi-subtitle">Customer Reviews</p>
                    <b className="testi-title">Loved by Homes Across India</b>
                </div>

                <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">

                    <div className="carousel-inner">

                        <div className="carousel-item active">
                            <div className="testimonial-card">
                                <img src="/modiji.jpg" className="testimonial-img" alt="Narendra Modi" />
                                <h3>Narendra Modi</h3>
<p>"The craftsmanship is outstanding. Every layer reflects precision, and the warm glow adds elegance to my home."</p>                            </div>
                        </div>

                        <div className="carousel-item">
                            <div className="testimonial-card">
                                <img src="/akshay.jpg" className="testimonial-img" alt="Akshay Kumar" />
                                <h3>Akshay Kumar</h3>
                                <p>
                                    "Absolutely stunning craftsmanship. The lamp completely changed the
                                    look of my living room."
                                </p>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <div className="testimonial-card">
                                <img src="/ambani.jpg" className="testimonial-img" alt="Mukesh Ambani" />
                                <h3>Mukesh Ambani</h3>
                                <p>
                                    "Premium quality, eco-friendly material and beautiful warm lighting.
                                    Highly recommended!"
                                </p>
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
                    <h2>Why Karigar Labs?</h2>
                    <p>
                        Every Karigar Labs creation combines modern technology with artistic craftsmanship.
                        Our products are designed to make your home feel warm, elegant and unique while
                        remaining environmentally responsible.
                    </p>
                </div>

                <div className="why-card">
                    <div className="iconcircle">
                    </div>
                    <h3>Premium 3D Printed Designs</h3>
                    <p>
                        Every product is carefully designed with exceptional detail and a flawless finish
                        using advanced 3D printing technology.
                    </p>                </div>

                <div className="why-card">
                    <div className="iconcircle">
                        <i className="bi bi-award-fill"></i>
                    </div>
                    <h3>Eco-Friendly Materials</h3>
                    <p>
                        We use sustainable PLA made from renewable resources, making every creation
                        beautiful and environmentally responsible.
                    </p>
                </div>

                <div className="why-card">
                    <div className="iconcircle">
                        <i className="bi bi-emoji-smile-fill"></i>
                    </div>
                    <h3>Made in India</h3>
                    <p>
                        Designed and manufactured in India with passion, precision and craftsmanship,
                        bringing premium décor to every home.
                    </p>                </div>
            </div>

<div className="faq-section">

    <div className="faq-heading">
        <p>Frequently Asked Questions</p>
        <h2>Everything You Need to Know</h2>
    </div>

    <div className="accordion" id="accordionExample">

        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                >
                    🌱 What material are Karigar Labs products made from?
                </button>
            </h2>

            <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body">
                    All our products are crafted using premium plant-based PLA,
                    an eco-friendly and biodegradable material that is durable,
                    lightweight, and perfect for modern home décor.
                </div>
            </div>
        </div>

        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                >
                    💡 Are your lamps safe for daily use?
                </button>
            </h2>

            <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body">
                    Yes! Our lamps use energy-efficient LED lighting that
                    produces very little heat, making them safe for everyday
                    use in bedrooms, living rooms, offices, and study spaces.
                </div>
            </div>
        </div>

        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                >
                    🎨 Can I request a custom design?
                </button>
            </h2>

            <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body">
                    Absolutely! We love creating personalized lamps, gifts,
                    logos, lithophanes, and custom home décor pieces. Simply
                    contact us through WhatsApp to discuss your idea.
                </div>
            </div>
        </div>

        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                >
                    🚚 How long does delivery take?
                </button>
            </h2>

            <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body">
                    Most orders are dispatched within 2–4 business days and
                    delivered across India in approximately 5–8 working days,
                    depending on your location.
                </div>
            </div>
        </div>

        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                >
                    🎁 Do you accept bulk and corporate orders?
                </button>
            </h2>

            <div
                id="collapseFive"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body">
                    Yes. We provide customized products, branding options, and
                    attractive pricing for corporate gifting, events, weddings,
                    and bulk purchases.
                </div>
            </div>
        </div>

    </div>

</div>

        </>
    );
};

export default Home;