import { useEffect, useState } from "react"
import Incidentservices from "../../../services/Incidentservices"

export default function Addincident() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [latitude, setLatitude] = useState('')
    const [location, setLocation] = useState('')
    const [longitude, setLongitude] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    // Get current location automatically
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
            },
            () => {
                alert("Please allow location access.")
            }
        )
    }, [])

    async function submitForm(e) {
        e.preventDefault()

        let payload = {
            name: title,
            description: description,
            latitude: latitude,
            location: location,
            longitude: longitude,
            imageUrl: imageUrl,
        }

        await Incidentservices.add(payload)

        alert("Incident added successfully!")
    }

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    Add Incident
                </h1>

                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">Home</a>
                    </li>

                    <li className="breadcrumb-item">
                        <a href="#">Pages</a>
                    </li>

                    <li className="breadcrumb-item active text-white">
                        Add Incident
                    </li>
                </ol>
            </div>

            <div className="container-fluid Login py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">

                        <div className="row g-5">
                            <div className="col-lg-12">

                                <form onSubmit={submitForm}>

                                    {/* Title */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Title"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />

                                    {/* Description */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Description"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

                                    {/* Latitude - Automatic */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Latitude"
                                        value={latitude}
                                        readOnly
                                    />

                                    {/* Location */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Location"
                                        onChange={(e) => setLocation(e.target.value)}
                                    />

                                    {/* Longitude - Automatic */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Longitude"
                                        value={longitude}
                                        readOnly
                                    />

                                    {/* Image URL */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Image URL"
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />

                                    {/* Submit */}
                                    <button
                                        className="w-100 btn btn-primary form-control py-3 border-primary text-white bg-primary"
                                        type="submit"
                                    >
                                        Submit
                                    </button>

                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}