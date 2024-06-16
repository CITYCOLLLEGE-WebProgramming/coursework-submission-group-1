import "../styles/Footer.css";
import { LocalPhone, Email } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer container-fluid text-light text-center">
      <div className="footer_left">
        <a href="/" className="footer_logo">
          TRIPHUB
        </a>
      </div>

      <div className="footer_center text-dark">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right text-dark">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+1 234 567 890</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>triphub@support.com</p>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  );
};

export default Footer;
