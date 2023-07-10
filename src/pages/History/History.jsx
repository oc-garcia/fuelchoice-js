import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase-config";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import "./History.scss";

export default function History() {
  const productRef = collection(db, "history");
  const [logs, setLogs] = useState([]);
  const [delAction, setDelAction] = useState(false);
  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await getDocs(productRef);
        setLogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error(error);
      }
    };
    if (delAction === true) {
      setDelAction(false);
    }
    getHistory();
  }, [delAction]);
  return (
    <main>
      <section className="historyContainer">
        {logs.length !== 0 && (
          <>
            <h2 className="historyDescription">Detailed queries will be displayed here:</h2>
            <ul>
              {logs.map((log) => (
                <HistoryCard key={log.id} log={log} setDelAction={setDelAction} />
              ))}
            </ul>
          </>
        )}
        {logs.length === 0 && <h2 className="historyDescription">No history yet!</h2>}
      </section>
    </main>
  );
}
