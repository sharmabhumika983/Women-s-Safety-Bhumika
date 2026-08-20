export default function About(){
    return(
    <>
    <>
  {/* About Start */}
  <div className="container-fluid py-5 about bg-light">
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
          <div className="video border">
            <button
              type="button"
              className="btn btn-play"
              data-bs-toggle="modal"
              data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
              data-bs-target="#videoModal"
            >
              <span />
            </button>
          </div>
        </div>
        <div className="col-lg-7 wow fadeIn" data-wow-delay="0.3s">
          <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius">
            About Us
          </h4>
          <h1 className="text-dark mb-4 display-5">
            We Learn Smart Way To Build Bright Futute For Your Children
          </h1>
          <p className="text-dark mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s.
          </p>
          <div className="row mb-4">
            <div className="col-lg-6">
              <h6 className="mb-3">
                <i className="fas fa-check-circle me-2" />
                Sport Activites
              </h6>
              <h6 className="mb-3">
                <i className="fas fa-check-circle me-2 text-primary" />
                Outdoor Games
              </h6>
              <h6 className="mb-3">
                <i className="fas fa-check-circle me-2 text-secondary" />
                Nutritious Foods
              </h6>
            </div>
            <div className="col-lg-6">
              <h6 className="mb-3">
                <i className="fas fa-check-circle me-2" />
                Highly Secured
              </h6>
              <h6 className="mb-3">
                <i className="fas fa-check-circle me-2 text-primary" />
                Friendly Environment
              </h6>
              <h6>
                <i className="fas fa-check-circle me-2 text-secondary" />
                Qualified Teacher
              </h6>
            </div>
          </div>
          <a href="" className="btn btn-primary px-5 py-3 btn-border-radius">
            More Details
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* Modal Video */}
  <div
    className="modal fade"
    id="videoModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content rounded-0">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Youtube Video
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          {/* 16:9 aspect ratio */}
          <div className="ratio ratio-16x9">
            <iframe
              className="embed-responsive-item"
              src=""
              id="video"
              allowFullScreen=""
              allowscriptaccess="always"
              allow="autoplay"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}
</>

    </>
    )
}