import '../Styles/Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div>
                <a to="/about">About Us</a>
                <a to="/contact">Contact Us</a>
                <a to="/privacy">Privacy Policy</a>
            </div>
            <p>&copy; {new Date().getFullYear()} AWAS-Shopper. All Rights Reserved.</p>
        </div>
    );
};

export default Footer;
