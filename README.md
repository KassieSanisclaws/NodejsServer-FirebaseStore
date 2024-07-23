# Firebase User Management API
This project is a Node.js server application that manages user registrations, updates, deletions, and retrievals using Firebase Authentication and Firestore.

## Project Structure
 - npm i dependencies packages.
 - nodemon -g for managing changes in server and automactically without the need to stop and restart it restarts with the  
   updated saved changes.  
 - 

## Prerequisites
- Node.js (v14.x or later)
- Firebase account with Firestore and Firebase Authentication enabled
- Firebase Admin SDK service account key

## Setup Instructions
1. **Clone the Repository:**

   ```sh
   git clone https://github.com/KassieSanisclaws/NodejsServer-FirebaseStore.git


## Environment Setup<dotenv> EXAMPLE:
- FIREBASE_PROJECT_ID="your-firebase-project-id"
- FIREBASE_CLIENT_EMAIL="your-firebase-client-email"
- FIREBASE_PRIVATE_KEY="your-firebase-private-key"
- JWT_SECRET="your_jwt_secret"


## POSTMAN<RegisterBody> EXAMPLE:
{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "User Display Name",
  "firstname": "First Name",
  "lastname": "Last Name"
}

## POSTMAN<LoginBody> EXAMPLE:
{
  "email": "user@example.com",
  "password": "password123",
}

## POSTMAN<updateUserBody> EXAMPLE:
{
  "firstname": "Jason example",
}

## POSTMAN<DeleteBody> EXAMPLE:
{
  in route /delete/:id of the document in the firestor you are targeting to delete.
}
