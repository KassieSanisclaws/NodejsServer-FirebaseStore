const { firestore, auth } = require('../FirebaseConfigDB/config.firebase');
const UserModel = require('../Models/usersModel');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');

// Register a new User:
 const registerUser = async (req, res) => {
    const { email, password, displayName } = req.body;

    try {
        const userCredential = await auth.createUser(
            userCredential.uid,
            email, 
            password,
            displayName,
            'user'
          ); 
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

         await UserModel.updateUser(uid, email, displayName, photoURL, role);

         res.status(200).send({ message: 'User updated successfully!'});
      }catch(err){
          res.status(400).send({ message: err.message });
     }
  };

// Delete User:
  const deleteUser = async (req, res) => {
    const { uid } = req.body;

    try {
      await auth.deleteUser(uid);
      await UserModel.deleteUser(uid);

      res.status(200).send({ message: "User deleted successfully!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

// Upload Process Data:
const uploadProcessData = async () => {
  const dataToLoad = {
    users: [
      {
        email: "admin@example.com",
        password: "123456",
        displayName: "Admin",
        role: "admin",
      },
      {
        email: "user@example.com",
        password: "123456",
        displayName: "User",
        role: "user",
      },
    ],
  };

  try {
    const document = firestore
      .collection("DB Name")
      .doc("Unique ID for the document");
    await document.set(dataToLoad);
    return dataToLoad;
  } catch (err) {
    console.log(err);
  }
};

// Get Users:
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// GetUserByID Verifying an ID token firebase:
const getUserById = async (req, res) => {
  const { authToken } = req.headers;
  const { userId } = req.params;
  const user = users[userId];

  try {
  //Verify by the Admin package:
 const authUser =  await admin.auth().verifyIdToken(authToken);
 if(authUser.uid !== userId) {
  return res.status(403).json({ message: 'Unauthorized!'});
  }
 } catch(err){
    res.status(401).json({ message: 'Unauthorized!'});
 }

  if(user){
    res.status(200).json(user);
  }else {
    res.status(404).json({ message: 'User not found!'});
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
    deleteUser,
    getUsers,
    getUserById,
    createNewUser,
 }