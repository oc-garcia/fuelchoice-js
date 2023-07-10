import { Trash } from "@phosphor-icons/react";
import { deleteDoc, doc } from "firebase/firestore";
import "./HistoryCard.scss";
import { db } from "../../services/firebase-config";

export default function HistoryCard(Props) {
  const getResult = (prmt) => {
    if (prmt.draw) {
      return "You could use either!";
    } else if (prmt.isPetrol && !prmt.draw) {
      return "You used Petrol!";
    } else if (!prmt.isPetrol && !prmt.draw) {
      return "You used Ethanol!";
    }
  };
  return (
    <li className="historyCardContainer">
      <div>
        <p className="label">Date & Time:</p>
        <div>
          <h2 className="stats">{Props.log.date}</h2>
          <h2 className="stats">{Props.log.time}</h2>
        </div>
      </div>
      <div>
        <p className="label">Petrol price:</p>
        <p className="stats">{Props.log.petrolCost}</p>
      </div>
      <div>
        <p className="label">Petrol efficiency km/l:</p>
        <p className="stats">{Props.log.petrolEfficiency}</p>
      </div>
      <div>
        <p className="label">Ethanol price:</p>
        <p className="stats">{Props.log.ethanolCost}</p>
      </div>
      <div>
        <p className="label">Ethanol efficiency km/l:</p>
        <p className="stats">{Props.log.ethanolEfficiency}</p>
      </div>
      <p className="stats">{getResult(Props.log)}</p>
      <div className="deleteBtn">
        <Trash
          size={24}
          onClick={async () => {
            try {
              await deleteDoc(doc(db, "history", Props.log.id));
              Props.setDelAction(true);
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </div>
    </li>
  );
}
