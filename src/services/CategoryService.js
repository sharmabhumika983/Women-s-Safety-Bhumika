import Categorymodels from "../models/Categorymodels";
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const dbPath = "categories";

class CategoryService {
    // CREATE
    async add(data) {
        let newCategory = new Categorymodels();
        newCategory.name = data.name || data.title || "";
        newCategory.description = data.description || "";
        newCategory.status = data.status || "Active";
        newCategory.createdAt = new Date().toISOString();

        const docRef = await addDoc(collection(db, dbPath), { ...newCategory });
        console.log("Category created with ID: ", docRef.id);
        return docRef;
    }

    // READ ALL
    async all() {
        const querySnapshot = await getDocs(collection(db, dbPath));
        let categories = [];
        querySnapshot.forEach((doc) => {
            categories.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return categories;
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

export default new CategoryService();
