import '../Styles/Contact.css';

const Contact = () => {
    return (
        <div className="contact">
            <h1>Contact Us</h1>
            <p>We would love to hear from you! Feel free to reach out for any questions or inquiries.</p>
            
            <div className="contact-info">
                <div>
                    <i className="fas fa-phone-alt"></i>
                    <p>Phone: +123 456 7890</p>
                </div>
                <div>
                    <i className="fas fa-envelope"></i>
                    <p>Email: support@yourstore.com</p>
                </div>
                <div>
                    <i className="fas fa-map-marker-alt"></i>
                    <p>Location: 123 Main St, City, Country</p>
                </div>
            </div>

            <div className="contact-form">
                <h2>Send us a Message</h2>
                <form>
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
