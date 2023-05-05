import { db } from "../config/firebase";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

function MailListAdder() {
  const [email, setEmail] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const emailListCollectionRef = collection(db, "email_list");

  const onSignUp = async () => {
    try {
      await addDoc(emailListCollectionRef, { email });
      setSignedUp(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {signedUp ? (
        <p>Thank you for signing up</p>
    
      ) : (
        <>
          <input
            placeholder="Enter email..."
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={onSignUp}> Sign Up </button>
        </>
      )}
    </>
  );
}

export default MailListAdder;
