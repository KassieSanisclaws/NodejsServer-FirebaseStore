const { firestore, auth } = require('../FirebaseConfigDB/config.firebase');
const userModel = require('../Models/usersModel');

// Register a new User:
 const registerUser = async (req, res) => {
    const { email, password, displayName } = req.body;

    try {
        const userCredential = await auth.createNewUser({
            email, 
            password,
            displayName 
        });
         
       await firestore.collection('users').doc(userCredential.uid.set({
           email,
           displayName,
           role: 'user' //Default Role
       }))
       
       res.status(201).send({ message: 'User created successfully!'});
    }catch(err){
        res.status(500).send({ message: err.message });
    }
 };

 // Login User:

 // Update User:
   const updateUser = async (req, res) => {
    const { uid, email, displayName, photoURL, role } = req.body;

      try {
         await auth.updateUser(uid, {displayName, photoURL});

         await firestore.collection('users').doc(uid).update({ displayName, photoURL, role });

         res.status(200).send({ message: 'User updated successfully!'});
      }catch(err){
          res.status(400).send({ message: err.message });
    }
   };
   
// Delete User:
  const deleteUser = async (req, res) => {
    const { uid } = req.body;

    try {
        // Delete User from Firebase Auth:
        await auth.deleteUser(uid);
        // Delete User from Firestore:
        await firestore.collection('users').doc(uid).delete();
        res.status(200).send({ message: 'User deleted successfully!'});
    } catch(err){
        res.status(500).send({ message: err.message });
  }
};

 module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
 }