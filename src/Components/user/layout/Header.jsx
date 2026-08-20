import { Link } from "react-router-dom"

export default function Header(){
    return(
    <>
    <>
  {/* Navbar start */}
  <div
    className="container-fluid border-bottom bg-light wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div
      className="container topbar bg-primary d-none d-lg-block py-2"
      style={{ borderRadius: "0 40px" }}
    >
      <div className="d-flex justify-content-between">
        <div className="top-info ps-2">
          <small className="me-3">
            <i className="fas fa-map-marker-alt me-2 text-secondary" />{" "}
            <a href="#" className="text-white">
              7-A Arjun Nagar,Jalandhar
            </a>
          </small>
          <small className="me-3">
            <i className="fas fa-envelope me-2 text-secondary" />
            <a href="#" className="text-white">
            sharmabhumika983@gmail.com
            </a>
          </small>
        </div>
        <div className="top-link pe-2">
          <a href="" className="btn btn-light btn-sm-square rounded-circle">
            <i className="fab fa-facebook-f text-secondary" />
          </a>
          <a href="" className="btn btn-light btn-sm-square rounded-circle">
            <i className="fab fa-twitter text-secondary" />
          </a>
          <a href="" className="btn btn-light btn-sm-square rounded-circle">
            <i className="fab fa-instagram text-secondary" />
          </a>
          <a
            href=""
            className="btn btn-light btn-sm-square rounded-circle me-0"
          >
            <i className="fab fa-linkedin-in text-secondary" />
          </a>
        </div>
      </div>
    </div>
    <div className="container px-0">
      <nav className="navbar navbar-light navbar-expand-xl py-3">
        <a href="index.html" className="navbar-brand">
          <h1 className="text-primary display-6">
            Baby<span className="text-secondary">Care</span>
          </h1>
        </a>
        <button
          className="navbar-toggler py-2 px-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars text-primary" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav mx-auto">
            <Link to="/" className="nav-item nav-link active">
              Home
            </Link>
            <Link to='/incident' className="nav-item nav-link">
            Incidents
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <Link to="/service" className="nav-item nav-link">
              Services
            </Link>
            <Link to="/program" className="nav-item nav-link">
              Programs
            </Link>
            <Link to="/event" className="nav-item nav-link">
              Events
            </Link>
            <div className="nav-item dropdown">
              <Link to=""
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </Link>
              <div className="dropdown-menu m-0 bg-secondary rounded-0">
                <Link to="/blog" className="dropdown-item">
                  Our Blog
                </Link>
                <Link to="/team" className="dropdown-item">
                  Our Team
                </Link>
                <Link to="/testimonial" className="dropdown-item">
                  Testimonial
                </Link>
                <Link to="/404" className="dropdown-item">
                  404 Page
                </Link>
              </div>
            </div>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
          </div>
          <div className="d-flex me-4">
            <div
              id="phone-tada"
              className="d-flex align-items-center justify-content-center"
            >
              <Link to=""
                className="position-relative wow tada"
                data-wow-delay=".9s"
              >
                <i className="fa fa-phone-alt text-primary fa-2x me-4" />
                <div
                  className="position-absolute"
                  style={{ top: "-7px", left: 20 }}
                >
                  <span>
                    <i className="fa fa-comment-dots text-secondary" />
                  </span>
                </div>
              </Link>
            </div>
            <div className="d-flex flex-column pe-3 border-end border-primary">
              <span className="text-primary">Have any questions?</span>
              <Link to="">
                <span className="text-secondary">Free: + 91 97790-94021</span>
              </Link>
            </div>
          </div>
          <button
            className="btn-search btn btn-primary btn-md-square rounded-circle"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
          >
            <i className="fas fa-search text-white" />
          </button>
        </div>
      </nav>
    </div>
  </div>
  {/* Navbar End */}
  {/* Modal Search Start */}
  <div
    className="modal fade"
    id="searchModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-fullscreen">
      <div className="modal-content rounded-0">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Search by keyword
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body d-flex align-items-center">
          <div className="input-group w-75 mx-auto d-flex">
            <input
              type="search"
              className="form-control p-3"
              placeholder="keywords"
              aria-describedby="search-icon-1"
            />
            <span id="search-icon-1" className="input-group-text p-3">
              <i className="fa fa-search" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Modal Search End */}
</>

    </>
    )
}