import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Incidentservices from "../../../services/Incidentservices"

export default function Manageincident() {

    const [incidents, setIncidents] = useState([])

    useEffect(() => {
        loadIncidents()
    }, [])

    async function loadIncidents() {
        const data = await Incidentservices.all()
        setIncidents(data)
    }

    async function deleteIncident(id) {
        await Incidentservices.deleteItem(id)
        loadIncidents()
    }

    return (
        <>
            {/* Header Start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    Manage Incidents
                </h1>

                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>

                    <li className="breadcrumb-item active text-white">
                        Manage Incidents
                    </li>
                </ol>
            </div>
            {/* Header End */}


            {/* Incident Section Start */}
            <div className="container-fluid program py-5">

                <div className="container py-5">

                    {/* Report Incident Button */}
                    <div className="d-flex justify-content-end mb-5">

                        <Link to="/incident/add">
                            <button className="btn btn-primary px-4 py-2 text-white">
                                Report Incident
                            </button>
                        </Link>

                    </div>


                    {/* Heading */}
                    <div
                        className="mx-auto text-center"
                        style={{ maxWidth: 700 }}
                    >

                        <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2">
                            Women's Safety
                        </h4>

                        <h1 className="mb-5 display-5">
                            Reported Incidents
                        </h1>

                    </div>


                    {/* Incidents */}
                    <div className="row g-5 justify-content-center">

                        {incidents.length === 0 ? (

                            <div className="text-center">
                                <h4>No incidents reported yet.</h4>
                            </div>

                        ) : (

                            incidents.map((incident) => (

                                <div
                                    className="col-md-6 col-lg-6 col-xl-4"
                                    key={incident.id}
                                >

                                    <div className="program-item rounded">

                                        {/* Image */}
                                        <div className="program-img position-relative">

                                            <div className="overflow-hidden img-border-radius">

                                                <img
                                                    src={
                                                        incident.imageUrl
                                                            ? incident.imageUrl
                                                            : "img/incident 1.jpg"
                                                    }
                                                    className="img-fluid w-100"
                                                    alt={incident.name}
                                                />

                                            </div>

                                            {/* Status */}
                                            <div className="px-4 py-2 bg-primary text-white program-rate">
                                                {incident.status}
                                            </div>

                                        </div>


                                        {/* Incident Details */}
                                        <div className="program-text bg-white px-4 pb-3">

                                            <div className="program-text-inner">

                                                <h4 className="mb-3">
                                                    {incident.name}
                                                </h4>

                                                <p className="mt-3 mb-3">
                                                    {incident.description}
                                                </p>

                                                <p className="mb-2">
                                                    <strong>Location:</strong>{" "}
                                                    {incident.location}
                                                </p>

                                                <p className="mb-2">
                                                    <strong>Latitude:</strong>{" "}
                                                    {incident.latitude}
                                                </p>

                                                <p className="mb-2">
                                                    <strong>Longitude:</strong>{" "}
                                                    {incident.longitude}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Buttons */}
                                        <div className="d-flex justify-content-end px-4 py-3 bg-primary rounded-bottom">

                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    deleteIncident(incident.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>
            {/* Incident Section End */}

        </>
    )
}