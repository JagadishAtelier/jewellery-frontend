import React from "react";
import "./Payments.css";
import packing from "../../assets/Home-Page-final-2.webp";
import PaymentImage from '../../assets/Payment-Method-PNG-pic.png'
import deleveryImage from '../../assets/Blog_CheapCourierService.png'
function Payments() {
  return (
    <> 
    {/* <div className="mt-5 categoryheading">
        <h1 className='my-3 ' >Hassle-Free Checkout</h1>
        <p className=' my-3 ' style={{ transitionDelay: "0.2s" }}>Take look at our Payment,Delvery,Packing</p>
      </div> */}
      <div>
    <div className="payment-deliver">
      <div className="payment-section">
        <div className="paytext">
          <h1>Payments</h1>
          <p>We offer a range of convenient and secure payment options to enhance your shopping experience:</p>
<p><strong>Accepted Cards:</strong> VISA, MasterCard</p>
<p><strong>Cashless Payments:</strong> Fully supported</p>
<p><strong>Fast & Secure Checkout:</strong> Seamless digital transactions for hassle-free purchases</p>

        </div>
          <img src={PaymentImage} className="payement-image"/>
      </div>

      <div className="deliver-section">
        <div className="toptext">
          <h1>Delivery</h1>
          <p>We offer various delivery options to suit your needs, including free in-store pickup.</p>
<p>Each product is carefully checked and securely packed before shipping to ensure quality and safety.</p>
<p>Various delivery options are available, including free pick-up. We carefully check and pack each product before shipping.</p>

        </div>
        <img src={deleveryImage} className="payement-image"/>
      </div>
      </div>
        <img src={packing} />
    </div>
    </>
  );
}

export default Payments;
