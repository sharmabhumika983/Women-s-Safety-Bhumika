import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const dbPath = "safety_tips";

class SafetyTipService {
    async addTip(tip) {
        const docRef = doc(collection(db, dbPath));
        await setDoc(docRef, { ...tip, id: docRef.id });
    }

    async getAllTips() {
        const snapshot = await getDocs(collection(db, dbPath));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async updateTip(id, updatedData) {
        const docRef = doc(db, dbPath, id);
        await updateDoc(docRef, updatedData);
    }

    async deleteTip(id) {
        const docRef = doc(db, dbPath, id);
        await deleteDoc(docRef);
    }
}

export default new SafetyTipService();
