import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../Services/firebase-config";

const defaultPriceState = {
  petrol: "",
  ethanol: "",
};

const defaultEfficiencyState = {
  onPetrol: "",
  onEthanol: "",
};

export default function PriceChecker() {
  const [prices, setPrices] = useState(defaultPriceState);
  const [efficiency, setEfficiency] = useState(defaultEfficiencyState);
  const [isPetrol, setisPetrol] = useState(null);
  const [isSimplified, setisSimplified] = useState(true);
  const [draw, setDraw] = useState(false);

  const productRef = collection(db, "history");

  const resetQuery = () => {
    setDraw(false);
    setisPetrol(null);
    setEfficiency(defaultEfficiencyState);
    setPrices(defaultPriceState);
  };

  const submitPrices = async (e) => {
    e.preventDefault();
    if (isSimplified) {
      if (prices === defaultPriceState) {
        return;
      }
      const ethanolEfficiency = 0.7;
      const ethanolCost = prices.ethanol / ethanolEfficiency;
      if (ethanolCost < prices.petrol) {
        return setisPetrol(false);
      } else if (ethanolCost > prices.petrol) {
        return setisPetrol(true);
      } else {
        setDraw(true);
      }
    }
    if (!isSimplified) {
      if (prices === defaultPriceState && efficiency === defaultEfficiencyState) {
        return;
      }
      const ethanolCost = prices.ethanol / efficiency.onEthanol;
      const petrolCost = prices.petrol / efficiency.onPetrol;
      if (ethanolCost < petrolCost) {
        setisPetrol(false);
      } else if (ethanolCost > petrolCost) {
        setisPetrol(true);
      } else {
        setDraw(true);
      }
      await addDoc(productRef, {
        petrolCost: prices.petrol,
        petrolEfficiency: efficiency.onPetrol,
        ethanolCost: prices.ethanol,
        ethanolEfficiency: efficiency.onEthanol,
        isPetrol: isPetrol,
        draw: draw,
      });
    }
  };
  return (
    <main className="mainContainer">
      <div className="typeContainer">
        <p>Simplified</p>
        <div
          className={isSimplified ? "switchContainerSimplified" : "switchContainerDetailed"}
          onClick={() => {
            setisSimplified(!isSimplified);
            resetQuery();
          }}>
          <div className="switchBtn"></div>
        </div>
        <p>Detailed</p>
      </div>
      <form className="formContainer" onSubmit={submitPrices}>
        <div className="inputContainer">
          <label htmlFor="petrol">Petrol Price</label>
          <input
            onChange={(e) => {
              setPrices({ ...prices, petrol: e.target.value });
            }}
            type="number"
            id="petrol"
            value={prices.petrol}
          />
        </div>
        {!isSimplified && (
          <div className="inputContainer">
            <label htmlFor="petrol">Petrol efficiency km/l</label>
            <input
              onChange={(e) => {
                setEfficiency({ ...efficiency, onPetrol: e.target.value });
              }}
              type="number"
              id="petrol"
              value={efficiency.onPetrol}
            />
          </div>
        )}
        <div className="inputContainer">
          <label htmlFor="ethanol">Ethanol Price</label>
          <input
            onChange={(e) => {
              setPrices({ ...prices, ethanol: e.target.value });
            }}
            type="number"
            id="ethanol"
            value={prices.ethanol}
          />
        </div>
        {!isSimplified && (
          <div className="inputContainer">
            <label htmlFor="ethanol">Ethanol efficiency km/l</label>
            <input
              onChange={(e) => {
                setEfficiency({ ...efficiency, onEthanol: e.target.value });
              }}
              type="number"
              id="ethanol"
              value={efficiency.onEthanol}
            />
          </div>
        )}
        <button className="submitBtn" type="submit">
          Check it out
        </button>
      </form>
      {isPetrol !== null && (
        <section>
          {isPetrol ? (
            <h2 className="result">Petrol is more cost-effective. Choose petrol.</h2>
          ) : (
            <h2 className="result">Ethanol is more cost-effective. Choose ethanol.</h2>
          )}
        </section>
      )}
      {draw && (
        <section>
          <h2 className="result">Choose either.</h2>
        </section>
      )}
    </main>
  );
}