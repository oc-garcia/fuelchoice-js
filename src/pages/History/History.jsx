import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase-config";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import './History.scss'

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
  return (
    <main>
      <section className="historyContainer">
        <h2 className="historyDescription">Detailed queries will be displayed here:</h2>
        <ul>
          {logs.map((log) => (
            <HistoryCard key={log.id} log={log} />
          ))}
        </ul>
      </section>
    </main>
  );
}
