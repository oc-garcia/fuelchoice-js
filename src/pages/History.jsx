import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Services/firebase-config";
import HistoryCard from "../Components/HistoryCard/HistoryCard";

export default function History() {
  const productRef = collection(db, "history");
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await getDocs(productRef);
        setLogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error(error);
      }
    };
    getHistory();
  }, []);
  console.log(logs);

  return (
    <main>
      <section className="historyContainer">
        <ul>
          {logs.map((log) => (
            <HistoryCard key={log.id} log={log} />
          ))}
        </ul>
      </section>
    </main>
  );
}
