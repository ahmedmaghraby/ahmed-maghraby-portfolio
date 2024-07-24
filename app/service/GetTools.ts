import firebase_app from "../../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function getTools() {
  const collectionRef = collection(db, 'tools');

  let result = null;
  let error = null;

  try {
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data()    }));

    result = data[0];
    console.log(result);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
