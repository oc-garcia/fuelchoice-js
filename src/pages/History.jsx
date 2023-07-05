import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Services/firebase-config";

export default function History() {
  const productRef = collection(db, "history");
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await getDocs(productRef);
        setHistory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error(error);
      }
    };
    getHistory();
  }, []);
  console.log(history);
  const getResult = (prmt) => {
    console.log(prmt);
    if (prmt.draw) {
      return <p>You could use either</p>;
    } else if (prmt.isPetrol && !prmt.draw) {
      return <p>You used Petrol</p>;
    } else if (!prmt.isPetrol && !prmt.draw) {
      return <p>You used Ethanol</p>;
    }
  };
  return (
    <main>
      <section>
        <ul>
          {history.map((hist) => (
            <li key={hist.id}>
              <p>{hist.petrolCost}</p>
              <p>{hist.petrolEfficiency}</p>
              <p>{hist.ethanolCost}</p>
              <p>{hist.ethanolEfficiency}</p>
              {getResult(hist)}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
