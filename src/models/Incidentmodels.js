class Incidentmodels {
    name = "";
    category = "";
    description = "";
    latitude = "";
    longitude = "";
    location = "";
    imageUrl = "";
    status = "Pending"; // "Pending", "In Progress", "Resolved", "Rejected"
    reportedBy = "";
    reportedByEmail = "";
    createdAt = new Date().toISOString();
}

export default Incidentmodels;