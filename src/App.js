import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import MailListAdder from "./components/MailListAdder"

function App() {
  const [gigList, setGigList] = useState([]);

  const gigsCollectionRef = collection(db, "gigs");

  useEffect(() => {
    const getGigList = async () => {
      try {
        const data = await getDocs(gigsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setGigList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getGigList();
  }, []);

  return (
    <div className="App">
      <div>
        {gigList.map((gig) => (
          <div>
            <h1> {gig.name} </h1>
            <p>{gig.venue}</p>
            <p>{gig.location}</p>
            <p> {gig.date.toDate().toDateString()} </p>
            <p> {gig.description} </p>
            <p>{gig.more_info_url}</p>
            <p>{gig.buy_tickets_url}</p>
          </div>
        ))}
      </div>
      <MailListAdder />
    </div>
  );
}

export default App;
