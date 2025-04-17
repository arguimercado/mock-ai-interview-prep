'use server'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db,auth as adminAuth } from "../firebase/admin";
import {auth as clientAuth} from "../firebase/client";

import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds

export async function signUp(params: SignUpParams) {

   const {name, email, password } = params;

   try {
      const userCredentials = await createUserWithEmailAndPassword(clientAuth, email,password);
      console.log(userCredentials);
      const uid = userCredentials.user.uid;
      //check if user already exists in firestore
      const userRecord = await db.collection("users").doc(uid).get();
      //if user already exists, return error
      if (userRecord.exists) {
         return { 
            success: false, 
            error: "User already exists. Please sign-in. " };
      }

      await db.collection("users").doc(uid).set({
         name,
         email,
         password,
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString()
      })

      

      return { success: true };
   } catch (error: any) {
      console.error("Signup failed:", error);
      if(error.code === 'auth/email-already-in-use') {
         return { 
            success: false, 
            error: "Email already in use" };
      }
      return { 
         success: false, 
         error: error 
      };
   }
}


export async function signIn(params: SignInParams) {
   const { email,password } = params;
   try {
      const userRecord = await adminAuth.getUserByEmail(email);
      if(!userRecord) {
         return { 
            success: false, 
            message: "User not found" };
      }
      
      const userCredentials = await signInWithEmailAndPassword(clientAuth, email, password);
      console.log(userCredentials);
      const idToken = await userCredentials.user.getIdToken();
      
      if(!idToken) {
         return { 
            success: false, 
            message: "Invalid credentials" 
         };
      }
      
      await setSessionCookie(idToken);

      return { success: true, message: "Successfully signin" };
   } 
   catch (error: any) {
      
      return { success: false, message: error.message };
   }
}

export async function getCurrentUser() : Promise<User | null> {
   const cookieStore = await cookies();
   const sessionCookie = cookieStore.get("session")?.value;
   if(!sessionCookie) {
      return null;
   }

   try {
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

      const userRecord = await db
            .collection("users")
            .doc(decodedClaims.uid)
            .get();
      if(!userRecord) {
         return null;
      }


      return {
         ...userRecord.data(),
         id: decodedClaims.uid,
      } as User;


   } catch (error) {
      console.error("Error verifying session cookie:", error);
      return null;
   }
}

export  async function signOut() {
   
   const cookieStore = await cookies();
   
   cookieStore.delete("session");
   
}

//check if the user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}




export async function setSessionCookie(idToken: string) {
   const cookieStore = await cookies();
   const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK
   });

   cookieStore.set("session", sessionCookie, {
      maxAge: ONE_WEEK,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
   });

}


export async function getInterviewsByUserId(userId: string) : Promise<Interview[] | null> {

   const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

   
   return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
   } as Interview))
}

export async function getLatestInterviews(params: GetLatestInterviewsParams) : Promise<Interview[] | null> {
   const {userId, limit = 20} = params;

   const interviews = await db
      .collection("interviews")
      .orderBy("createdAt", "desc")
      .where('finalized', '==', true)
      .where("userId", "!=", userId)
      .limit(limit)
      .get();

   
   return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
   } as Interview))
}