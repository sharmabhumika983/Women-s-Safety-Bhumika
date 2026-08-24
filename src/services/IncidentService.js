import Incidentmodels from "../models/Incidentmodels";
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const dbPath = "incidents";

class IncidentService {
    // CREATE
    async add(data) {
        let newIncident = new Incidentmodels();

        newIncident.name = data.name || data.title || "";
        newIncident.category = data.category || "General Safety";
        newIncident.description = data.description || "";
        newIncident.latitude = data.latitude || "";
        newIncident.location = data.location || "";
        newIncident.longitude = data.longitude || "";
        newIncident.imageUrl = data.imageUrl || "";
        newIncident.status = data.status || "Pending";
        newIncident.reportedBy = data.reportedBy || "";
        newIncident.reportedByEmail = data.reportedByEmail || "";
        newIncident.createdAt = new Date().toISOString();

        const docRef = await addDoc(collection(db, dbPath), { ...newIncident });
        console.log("Incident reported with ID: ", docRef.id);
        return docRef;
    }

    // READ ALL
    async all() {
        const querySnapshot = await getDocs(collection(db, dbPath));
        let incidents = [];
        querySnapshot.forEach((doc) => {
            incidents.push({
                id: doc.id,
                ...doc.data()
            });
        });
        // Sort newest first
        incidents.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        return incidents;
    }

    // READ SINGLE
    async single(id) {
        const docRef = doc(db, dbPath, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        } else {
            return false;
        }
    }

    // UPDATE
    async update(data, id) {
        const docRef = doc(db, dbPath, id);
        await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
    }

    // DELETE
    async deleteItem(id) {
        const docRef = doc(db, dbPath, id);
        await deleteDoc(docRef);
    }
}

export default new IncidentService();
