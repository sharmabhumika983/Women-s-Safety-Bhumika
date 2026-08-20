import { Link } from "react-router-dom"
export default function Footer(){
    return(
    <>
    <>
  {/* Footer Start */}
  <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.1s">
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-6 col-lg-4 col-xl-3">
          <div className="footer-item">
            <h2 className="fw-bold mb-3">
              <span className="text-primary mb-0">Women</span>
              <span className="text-secondary">safe</span>
            </h2>
            <p className="mb-4">
              Empowering women with safety, awareness & confidence.
            </p>
          
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <div className="footer-item">
            <div
              className="d-flex flex-column p-4 ps-5 text-dark border border-primary"
              style={{ borderRadius: "50% 20% / 10% 40%" }}>
                <div className="footer-links">
  <h3>QUICK LINKS</h3>

  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About Us</Link></li>
    <li><Link to="/services">Safety Tips</Link></li>
    <li><Link to="/emergency">Emergency</Link></li>
    <li><Link to="/contact">Contact Us</Link></li>
  </ul>
</div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <div className="footer-item">
            <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius">
              LOCATION
            </h4>
            <div className="d-flex flex-column align-items-start">
              <a href="" className="text-body mb-4">
                <i className="fa fa-map-marker-alt text-primary me-2" /> 
                7-A Arjun Nagar,Jalandhar
              </a>
              <a href="" className="text-start rounded-0 text-body mb-4">
                <i className="fa fa-phone-alt text-primary me-2" /> (+91) 97790-94021
                
              </a>
              <a href="" className="text-start rounded-0 text-body mb-4">
                <i className="fas fa-envelope text-primary me-2" />{" "}
                sharmabhumi@gmail.com
              </a>
              <a href="" className="text-start rounded-0 text-body mb-4">
                <i className="fa fa-clock text-primary me-2" /> 24/7 Hours
                Service
              </a>
              <div className="footer-icon d-flex">
                <a
                  className="btn btn-primary btn-sm-square me-3 rounded-circle text-white"
                  href=""
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="btn btn-primary btn-sm-square me-3 rounded-circle text-white"
                  href=""
                >
                  <i className="fab fa-twitter" />
                </a>
                <a
                  href="#"
                  className="btn btn-primary btn-sm-square me-3 rounded-circle text-white"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  href="#"
                  className="btn btn-primary btn-sm-square rounded-circle text-white"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <div className="footer-item">
            <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius">
              SAFETY AWARENESS
            </h4>
            <div className="row g-3">
              <div className="col-4">
                <div className="footer-galary-img rounded-circle border border-primary">
                  <img
                    src="img/img-1.jpg"
                    className="img-fluid rounded-circle p-2"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="footer-galary-img rounded-circle border border-primary">
                  <img
                    src="img/img-2.jpg"
                    className="img-fluid rounded-circle p-2"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="footer-galary-img rounded-circle border border-primary">
                  <img
                    src="img/img-4.jpg"
                    className="img-fluid rounded-circle p-2"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="footer-galary-img rounded-circle border border-primary">
                  <img
                    src="img/img-3.jpg"
                    className="img-fluid rounded-circle p-2"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="footer-galary-img rounded-circle border border-primary">
                  <img
                    src="img/img-5.jpg"
                    className="img-fluid rounded-circle p-2"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="footer-galary-img rounded-circle border border-primary">
                  <img
                    src="img/img-7.jpg"
                    className="img-fluid rounded-circle p-2"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Footer End */}
  {/* Copyright Start */}
  <div className="container-fluid copyright bg-dark py-4">
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <span className="text-light">
            <a href="#">
              <i className="fas fa-copyright text-light me-2" />
              2026 WomenSafe
            </a>
            , All right reserved.
          </span>
        </div>
        <div className="col-md-6 my-auto text-center text-md-end text-white">
          {/*/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. *** /*/}
          {/*/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, *** /*/}
          {/*/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". *** /*/}
          Designed By{" "}
          <Link to={""} className="border-bottom" href="#">
            BHUMIKA
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* Copyright End */}
</>

    </>)
}