import Usermodels from "../models/Usermodels";
import {collection,addDoc,getDocs,deleteDoc,doc,getDoc,updateDoc} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


class Userservices {

    // CREATE
    async register(data) {
        let newCategories = new Categorymodels();

        newCategories.name = data.name;
        newCategories.description = data.description;

        const docRef = await addDoc(collection(db, "Categories"),{ ...newCategories } );

        console.log("Document written with ID: ", docRef.id);
    }

    // READ ALL
    async all() {
        const querySnapshot = await getDocs(collection(db, "Categories"));

        let Categories = [];

        querySnapshot.forEach((doc) => {
            Categories.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return Categories;
    }

    // READ SINGLE
    async single(id) {
        const docRef = doc(db, "Categories", id);
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
        const docRef = doc(db, "Categories", id);
        await updateDoc(docRef, data);
    }

    // DELETE
    async deleteItem(id) {
        const docRef = doc(db, "Categories", id);
        await deleteDoc(docRef);
    }
}

export default new Userservices();