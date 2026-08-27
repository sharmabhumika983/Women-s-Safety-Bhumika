export default function EmergencyNumbers() {
    const contacts = [
        { title: "National Emergency Number", number: "112", icon: "fa-phone-alt", desc: "Single emergency number for police, fire, and ambulance." },
        { title: "Police", number: "100", icon: "fa-shield-alt", desc: "Direct line to local police authorities." },
        { title: "Women Helpline", number: "1091", icon: "fa-female", desc: "24/7 dedicated helpline for women in distress." },
        { title: "Domestic Abuse Helpline", number: "181", icon: "fa-home", desc: "Support and assistance for victims of domestic violence." },
        { title: "Ambulance", number: "102", icon: "fa-ambulance", desc: "Medical emergencies and hospital transport." }
    ];

    return (
        <div className="container py-5 mt-5">
            <div className="text-center mb-5">
                <h2 className="display-5 fw-bold text-danger">Emergency Contacts</h2>
                <p className="lead text-muted">Quick access to essential helplines in case of an emergency.</p>
            </div>

            <div className="row g-4 justify-content-center">
                {contacts.map((contact, index) => (
                    <div className="col-md-6 col-lg-4" key={index}>
                        <div className="card h-100 shadow border-danger border-top border-3">
                            <div className="card-body text-center p-4">
                                <div className="icon-box bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '70px', height: '70px'}}>
                                    <i className={`fas ${contact.icon} fa-2x`}></i>
                                </div>
                                <h4 className="card-title fw-bold mb-2">{contact.title}</h4>
                                <h2 className="text-danger fw-bolder mb-3">{contact.number}</h2>
                                <p className="card-text text-muted">{contact.desc}</p>
                                <a href={`tel:${contact.number}`} className="btn btn-outline-danger w-100 mt-2 rounded-pill fw-bold">
                                    <i className="fas fa-phone-volume me-2"></i> Call Now
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
