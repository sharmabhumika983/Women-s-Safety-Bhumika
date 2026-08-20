import Incidentmodels from "../models/Incidentmodels";
import {collection,addDoc,getDocs,deleteDoc,doc,getDoc,updateDoc} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

class Incidentservices {

    // CREATE
    async add(data) {
        let newIncident = new Incidentmodels();

        newIncident.name = data.name;
        newIncident.description = data.description;
        newIncident.latitude = data.latitude;
        newIncident.location = data.location;
        newIncident.longitude = data.longitude;
        newIncident.imageUrl = data.imageUrl;

        const docRef = await addDoc(collection(db, "incidents"),{ ...newIncident } );

        console.log("Document written with ID: ", docRef.id);
    }

    // READ ALL
    async all() {
        const querySnapshot = await getDocs(collection(db, "incidents"));

        let incidents = [];

        querySnapshot.forEach((doc) => {
            incidents.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return incidents;
    }

    // READ SINGLE
    async single(id) {
        const docRef = doc(db, "incidents", id);
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
        const docRef = doc(db, "incidents", id);
        await updateDoc(docRef, data);
    }

    // DELETE
    async deleteItem(id) {
        const docRef = doc(db, "incidents", id);
        await deleteDoc(docRef);
    }
}

export default new Incidentservices();