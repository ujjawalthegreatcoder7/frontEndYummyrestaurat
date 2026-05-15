import "./component.css"
const Footer = () => {
    return (
        <> 

        <footer className="custom-footer">
  <div className="footer-container">

    <div className="footer-box">
      <div className="footer-icon">📍</div>
      <div>
        <h4>Address</h4>
        <p>New Rajinder Nagar</p>
        <p>New Delhi, NY 535022</p>
      </div>
    </div>

    <div className="footer-box">
      <div className="footer-icon">📞</div>
      <div>
        <h4>Contact</h4>
        <p><strong>Phone:</strong> +91 9971289376</p>
        <p><strong>Email:</strong> ujjawalarora777@gmail.com</p>
      </div>
    </div>

    <div className="footer-box">
      <div className="footer-icon">🕒</div>
      <div>
        <h4>Opening Hours</h4>
        <p><strong>Mon-Sat:</strong> 11AM - 23PM</p>
        <p><strong>Sunday:</strong> Closed</p>
      </div>
    </div>

    <div className="footer-box">
      <div>
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="#">X</a>
          <a href="#">f</a>
          <a href="#">◎</a>
          <a href="#">in</a>
        </div>
      </div>
    </div>

  </div>

  <hr />

  <div className="footer-bottom">
    <p>© Copyright <strong>Yummy</strong> All Rights Reserved</p>
    <p>
      Designed by <span>UJJAWAL ARORA</span>
    </p>
  </div>
</footer>

        </>
    );
};

export default Footer;