import "./component.css";

const Footer = () => {
  return (
    <footer className="custom-footer">

      <div className="footer-container">

        {/* Address */}
        <div className="footer-box">
          <div className="footer-icon">
            <i className="bi bi-geo-alt-fill"></i>
          </div>

          <div>
            <h4>Address</h4>
            <p>New Rajinder Nagar</p>
            <p>New Delhi, India</p>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-box">
          <div className="footer-icon">
            <i className="bi bi-telephone-fill"></i>
          </div>

          <div>
            <h4>Contact</h4>

            <p>
              <strong>Phone:</strong> +91 9971289376
            </p>

            <p>
              <strong>Email:</strong> ujjawalarora777@gmail.com
            </p>
          </div>
        </div>

        {/* About */}
        <div className="footer-box">
          <div className="footer-icon">
            <i className="bi bi-lightbulb-fill"></i>
          </div>

          <div>
            <h4>Karigar Labs</h4>

            <p>Premium 3D Printed Lamps & Home Décor</p>

            <p>Crafted with Precision • Made in India</p>
          </div>
        </div>

        {/* Social */}
        <div className="footer-box">
          <h4>Follow Us</h4>

          <div className="social-icons">

            <a
              href="https://www.instagram.com/karigar_labs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </a>

            <a
              href="https://wa.me/919971289376"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-whatsapp"></i>
            </a>

            <a href="mailto:ujjawalarora777@gmail.com">
              <i className="bi bi-envelope-fill"></i>
            </a>

          </div>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} <strong>Karigar Labs</strong>. All Rights Reserved.
        </p>

        <p className="des">
          Designed & Developed by <span>Ujjawal Arora</span>
        </p>

      </div>

    </footer>
  );
};

export default Footer;