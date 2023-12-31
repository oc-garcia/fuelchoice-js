import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";
import { getDate, getTime } from "./timeStamp";

const productRef = collection(db, "history");

export const postDocs = async (prices, efficiency, isPetrol, draw) => {
  await addDoc(productRef, {
    petrolCost: prices.petrol,
    petrolEfficiency: efficiency.onPetrol,
    ethanolCost: prices.ethanol,
    ethanolEfficiency: efficiency.onEthanol,
    isPetrol: isPetrol,
    draw: draw,
    date: getDate(),
    time: getTime(),
  });
};
