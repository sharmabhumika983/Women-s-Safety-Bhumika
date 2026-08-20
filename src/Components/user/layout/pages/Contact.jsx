export default function Contact(){
    return( 
    <>
    <>
  {/* Contact Start */}
  <div className="container-fluid py-5">
    <div className="container py-5">
      <div className="p-5 bg-light rounded">
        <div
          className="mx-auto text-center wow fadeIn"
          data-wow-delay="0.1s"
          style={{ maxWidth: 700 }}
        >
          <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius">
            Contact Us
          </h4>
          <h1 className="display-3">Contact For Any Query</h1>
          <p className="mb-5">
            The contact form is currently inactive. Get a functional and working
            contact form with Ajax &amp; PHP in a few minutes. Just copy and
            paste the files, add a little code and you're done.{" "}
            <a href7="https://htmlcodex.com/contact-form">Download Now</a>.
          </p>
        </div>
        <div className="row g-5 mb-5">
          <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
            <div className="d-flex w-100 border border-primary p-4 rounded bg-white">
              <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
              <div className="">
                <h4>Address</h4>
                <p className="mb-2">7-A Arjun Nagar,Jalandhar</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
            <div className="d-flex w-100 border border-primary p-4 rounded bg-white">
              <i className="fas fa-envelope fa-2x text-primary me-4" />
              <div className="">
                <h4>Mail Us</h4>
                <p className="mb-2">sharmabhumika983@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
            <div className="d-flex w-100 border border-primary p-4 rounded bg-white">
              <i className="fa fa-phone-alt fa-2x text-primary me-4" />
              <div className="">
                <h4>Telephone</h4>
                <p className="mb-2">(+91) 97790-94021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.3s">
            <form action="">
              <input
                type="text"
                className="w-100 form-control py-3 mb-5 border-primary"
                placeholder="Your Name"
              />
              <input
                type="email"
                className="w-100 form-control py-3 mb-5 border-primary"
                placeholder="Enter Your Email"
              />
              <textarea
                className="w-100 form-control mb-5 border-primary"
                rows={8}
                cols={10}
                placeholder="Your Message"
                defaultValue={""}
              />
              <button
                className="w-100 btn btn-primary form-control py-3 border-primary text-white bg-primary"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <div className="border border-primary h-100 rounded">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0360649959!2d-74.3093289654168!3d40.69753996411732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1691911295047!5m2!1sen!2sbd"
                className="w-100 h-100 rounded"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Contact End */}
</>

    </> 
    )
}