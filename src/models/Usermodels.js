class UserModel {
    name = "";
    email = "";
    phone = "";
    address = "";
    userType = 2; // 1 = Admin, 2 = Regular User
    id = "";
    createdAt = new Date().toISOString();
}

export default UserModel;
