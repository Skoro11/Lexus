import { useState } from "react";

import axios from "axios";


function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const [failMessageVisible, setFailMessageVisible] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        
        try {
            const response = await axios.post( import.meta.env.VITE_API_URL + "/contact", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                setFormData({ name: "", email: "", phone: "", message: "" });
                setSuccessMessageVisible(true);
                setTimeout(() => setSuccessMessageVisible(false), 6000);
            } else {
                alert("Failed to send message.");
                setFailMessageVisible(true);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setFailMessageVisible(true);
        }
    };





    return (
        <section className="mx-width-1170px mg-inline pd-in-30p pd-in-15-mb">
            <div className="links-home display-none-sm">
                <a className="home-link" href="/">Home</a> / Contact
            </div>

            <div className="space-between flex mg-bottom-100 direction-column-767 mg-top-10-sm">
                <div className="left-contact-container no-display-320-767">
                    <ul className="flex space-between direction-column height-100">
                        <li className="flex align-center bold">
                            <img src="call-us-icon.png" alt="Call us" />
                            <span className="padd-left-5">Call to us</span>
                        </li>
                        <li className="no-display-1023">We are available 24/7, 7 days a week.</li>
                        <li>Phone: +8801611112222</li>
                        <li><hr /></li>
                        <li className="flex align-center bold">
                            <img src="write-to-us-icon.png" alt="Write to us" />
                            <span className="padd-left-5">Write To US</span>
                        </li>
                        <li className="no-display-1023">Fill out our form and we will contact you within 24 hours.</li>
                        <li>Emails: customer@exclusive.com</li>
                        <li>Emails: support@exclusive.com</li>
                    </ul>
                </div>

                <div className="right-contact-container">
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                className="bg-input-secondary width-30"
                                placeholder="Your Name*"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            
                            <input
                                type="email"
                                className="bg-input-secondary width-30"
                                placeholder="Your Email*"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            
                            <input
                                type="text"
                                className="bg-input-secondary width-30"
                                placeholder="Your Phone*"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="send-message-container">
                            <textarea
                                className="bg-input-secondary send-message-textarea"
                                placeholder="Your Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button className="send-message-btn" type="submit">Send Message</button>
                    </form>
                </div>
            </div>

            {successMessageVisible && (
                <div className="popup">
                    <div className="popup-content">
                    <img src="checkmark.png" alt="Error"/>Message sent successfully!
                    </div>
                </div>
            )}
            {failMessageVisible && (
                <div className="popup">
                    <div className="popup-content">
                       <img src="error.png" alt="Error"/>Error occurred while sending a message!
                    </div>
                </div>
            )}
        </section>
    );
}

export default ContactPage;
