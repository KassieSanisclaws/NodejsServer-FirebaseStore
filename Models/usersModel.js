const { firestore } = require('../FirebaseConfigDB/config.firebase');

class UserModel {
  constructor(id, email, displayName, photoURL, role) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.role = role; // admin, user
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new UserModel(
      doc.id,
      data.email,
      data.displayName,
      data.photoURL,
      data.role
    );
  }

  static async getUserById(id) {
    try {
      const doc = await firestore.collection("users").doc(id).get();
      if (!doc.exists) {
        throw new Error("User not found");
      }
      return UserModel.fromFirestore(doc);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async createUser(id, email, displayName, photoURL, role) {
    const user = new UserModel(id, email, displayName, photoURL, role);
    await firestore.collection("users").doc(id).set({
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.role,
    });
    return user;
  }

  static async updateUser(id, email, displayName, photoURL, role) {
    await firestore.collection("users").doc(id).update({
      email,
      displayName,
      photoURL,
      role,
    });
  };

  static async deleteUser(id) {
    await firestore.collection("users").doc(id).delete();
  };

  static async getAllUsers() {
    try {
      const snapshot = await firestore.collection("users").get();
      console.log(`Retrieved ${snapshot.size} users`);
      if (snapshot.empty) {
      throw new Error("No users found");
    }
      const users = [];
      snapshot.forEach((doc) => {
        console.log(`User data: ${JSON.stringify(doc.data())}`);
        users.push(UserModel.fromFirestore(doc));
      });
      return users;
    } catch (err) {
      console.error(`Error getting users: ${err.message}`); 
      throw new Error(err.message);
    }
  };



}


module.exports = UserModel;