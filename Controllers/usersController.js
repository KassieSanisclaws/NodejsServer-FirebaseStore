const { firestore } = require('../FirebaseConfigDB/config.firebase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Register a new User:
 const registerUser = async (req, res) => {
    const { email, password, displayName, firstname, lastname } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create a new user document with a generated ID:
      const userRef = firestore.collection("usersTable").doc(); // Create a reference with an auto-generated ID
      const uid = userRef.id;
      const userCredential = {
        email,
        firstname,
        lastname,
        password: hashedPassword,
        displayName,
        createdAt: new Date().toISOString(),
        uid, // Inlcude uid as a field in the document
      };
      const response = await firestore
        .collection("usersTable")
        .add(userCredential);
      res.status(201).send({ message: "User created successfully!", response, uid });
    }catch(err){
            res.status(500).send({ message: err.message });
    }
   };

 // Login User:
 const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
  // Retreive the user from fireStore using the provided email:
  const userQuerySnapshot = await firestore.collection("usersTable")
   .where("email", "==", email)
   .get();

   // Check if the user exists in the firestore:
    if(userQuerySnapshot.empty){
      res.status(400).send({ message: 'User not found' });
    }

    // Get the use document:
    const userDoc = userQuerySnapshot.docs[0];
    const user = userDoc.data();

    // Compare the provided password with the hashed password in the firestore:
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if(!isPasswordValid){
      res.status(401).json({ message: 'Invalid email & or Password!' });
    }

    // Generate a JWT token:
   const token = jwt.sign({ userId: userDoc.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

   // Send the token to the user with successful response:
    res.status(200).json({ message: 'User logged Successfully!', token });
   }catch(err){
    res.status(500).json({ message: err.message });
  }
 };

 // Update User:
   const updateUser = async (req, res) => {
    const { firstname } = req.body;
      try {
         const id = req.params.id;
         const userRef = firestore.collection('usersTable').doc(id)
         .update({ 
            firstname 
          });
         res.status(200).json({ message: 'User updated successfully!', userRef});
      }catch(err){
          res.status(400).json({ message: err.message });
     }
  };

// Delete User:
  const deleteUserByID = async (req, res) => {
    try {
      const response = await firestore.collection('usersTable').doc(req.params.id)
      .delete();
      res.status(200).json({ message: "User deleted successfully!", response });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Get Users:
const getAllUsers = async (req, res) => {
  try {
    const usersRef = firestore.collection('usersTable');
    const response = await usersRef
    .get();
    const users = [];
    response.forEach((doc) => {
      users.push(doc.data());
  });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GetUserByID Verifying an ID token firebase:
const getUserById = async (req, res) => {
  try {
  const userRef = firestore.collection("usersTable").doc(req.params.userId);
  const response = await userRef
  .get();
  if (!response.exists) {
    res.status(404).json({ message: 'User not found!' });
  } else {
    res.status(200).json(response.data());
  }
  }catch(err){
    res.status(500).json({ message: err.message });
  }
};

const createNewUser = async (req, res) => {
  const { password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userJson = {
      email: req.body.email,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      createdAt: new Date().toISOString(),
      displayName: req.body.displayName,
      password: hashedPassword,
    };
    const response = await firestore.collection('usersTable').add(userJson);
    res.status(201).json({ message: 'User created successfully!', response });
    }catch (err) {
      res.status(500).json({ message: err.message });
    }
};

 module.exports = {
    registerUser,
    updateUser,
    deleteUserByID,
    getAllUsers,
    createNewUser,
    getUserById,
    loginUser,
 }