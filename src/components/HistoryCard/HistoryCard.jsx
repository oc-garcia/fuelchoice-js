import { Trash } from "@phosphor-icons/react";
import { deleteDoc, doc } from "firebase/firestore";
import "./HistoryCard.scss";
import { db } from "../../services/firebase-config";

export default function HistoryCard(Props) {
  const getResult = (prmt) => {
    if (prmt.draw) {
      return (
        <p>
          <strong>You could use either!</strong>
        </p>
      );
    } else if (prmt.isPetrol && !prmt.draw) {
      return (
        <p>
          <strong>You used Petrol!</strong>
        </p>
      );
    } else if (!prmt.isPetrol && !prmt.draw) {
      return (
        <p>
          <strong>You used Ethanol!</strong>
        </p>
      );
    }
  };
  return (
    <li className="historyCardContainer">
      <div>
        <p className="label">Date & Time:</p>
        <div>
          <h2>{Props.log.date}</h2>
          <h2>{Props.log.time}</h2>
        </div>
      </div>
      <div>
        <p className="label">Petrol price:</p>
        <p>{Props.log.petrolCost}</p>
      </div>
      <div>
        <p className="label">Petrol efficiency km/l:</p>
        <p>{Props.log.petrolEfficiency}</p>
      </div>
      <div>
        <p className="label">Ethanol price:</p>
        <p>{Props.log.ethanolCost}</p>
      </div>
      <div>
        <p className="label">Ethanol efficiency km/l:</p>
        <p>{Props.log.ethanolEfficiency}</p>
      </div>
      <div>{getResult(Props.log)}</div>
      <div className="deleteBtn">
        <Trash
          size={24}
          onClick={async () => {
            try {
              await deleteDoc(doc(db, "history", Props.log.id));
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </div>
    </li>
  );
}
