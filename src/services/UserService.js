import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import UserModel from "../models/Usermodels";
import { collection, doc, deleteDoc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import AuthService from "./AuthService";

const dbPath = "users";

class UserService {
    async register(payload) {
        const userRegister = await createUserWithEmailAndPassword(auth, payload.email, payload.password);

        let newUser = new UserModel();
        newUser.name = payload.name || "";
        newUser.email = payload.email || "";
        newUser.phone = payload.phone || payload.phonenumber || "";
        newUser.address = payload.address || "";
        newUser.userType = payload.userType || 2;
        newUser.id = userRegister.user.uid;
        newUser.createdAt = new Date().toISOString();

        await setDoc(doc(db, dbPath, userRegister.user.uid), { ...newUser });

        console.log("User register data: ", userRegister.user);
        return userRegister.user;
    }

    async login(data) {
        console.log("Login attempt: ", data.email);
        const authRes = await signInWithEmailAndPassword(auth, data.email, data.password);

        const docRef = doc(db, dbPath, authRes.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            let authData = {
                id: authRes.user.uid,
                name: userData.name || "",
                email: userData.email || authRes.user.email,
                token: authRes.user.accessToken || authRes.user.uid,
                userType: userData.userType || 2
            };
            await AuthService.setData(authData);
            return authData;
        } else {
            // In case user document does not exist yet (e.g. initial firebase admin)
            let authData = {
                id: authRes.user.uid,
                name: authRes.user.displayName || "User",
                email: authRes.user.email,
                token: authRes.user.accessToken || authRes.user.uid,
                userType: 2
            };
            await AuthService.setData(authData);
            return authData;
        }
    }

    async all() {
        let q = query(collection(db, dbPath), where("userType", "==", 2));
        const querySnapshot = await getDocs(q);
        let users = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return users;
    }

    async single(id) {
        const docRef = doc(db, dbPath, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return false;
    }

    async update(data, id) {
        const docRef = doc(db, dbPath, id);
        await updateDoc(docRef, { ...data });
    }

    async deleteUser(id) {
        const docRef = doc(db, dbPath, id);
        await deleteDoc(docRef);
    }
}

export default new UserService();
