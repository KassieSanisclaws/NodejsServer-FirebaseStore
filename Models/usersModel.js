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
    return new UserModel(doc.id, data.email, data.displayName, data.photoURL, data.role);
   }
}

module.exports = UserModel;