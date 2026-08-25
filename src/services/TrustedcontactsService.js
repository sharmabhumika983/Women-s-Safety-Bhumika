import TrustedcontactsModel from "../models/TrustedcontactsModel";
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const dbPath = "trustedcontacts";

class TrustedcontactsService {
    // CREATE
    async add(data) {
        let trustedcontacts = new TrustedcontactsModel();
        trustedcontacts.name = data.name || data.title || "";
        trustedcontacts.email = data.email || "";
        trustedcontacts.phone = data.phone || "";
        trustedcontacts.relation = data.relation || "";
        trustedcontacts.status = data.status || "Active";
        trustedcontacts.createdAt = new Date().toISOString();

        const docRef = await addDoc(collection(db, dbPath), { ...trustedcontacts });
        console.log("Trustedcontacts created with ID: ", docRef.id);
        return docRef;
    }

    // READ ALL
    async all() {
        const querySnapshot = await getDocs(collection(db, dbPath));
        let trustedcontacts = [];
        querySnapshot.forEach((doc) => {
            trustedcontacts.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return trustedcontacts;
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
        }
        return false;
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

export default new TrustedcontactsService();
