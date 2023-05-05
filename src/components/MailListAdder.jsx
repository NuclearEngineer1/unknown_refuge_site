import {db} from "../config/firebase"
import { useState } from "react"
import {collection, addDoc} from "firebase/firestore"

function MailListAdder() {
  
  const [email, setEmail] = useState("")

  const emailListCollectionRef = collection(db, "email_list")

  const onSignUp = async() => {
    try {
      await addDoc(emailListCollectionRef, { email });
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <div>
      <input placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={onSignUp}> Sign Up </button>
    </div>
  )
}

export default MailListAdder