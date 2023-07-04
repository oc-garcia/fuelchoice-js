import { useState } from "react";

const defaultPriceState = {
  petrol: 0,
  ethanol: 0,
};

const defaultEfficiencyState = {
  onPetrol: 0,
  onEthanol: 0,
};

export default function App() {
  const [prices, setPrices] = useState(defaultPriceState);
  const [efficiency, setEfficiency] = useState(defaultEfficiencyState);
  const [isPetrol, setisPetrol] = useState(null);
  const [isSimplified, setisSimplified] = useState(true);
  const [draw, setDraw] = useState(false);

  const resetQuery = () => {
    setDraw(false);
    setisPetrol(null);
    setEfficiency(defaultEfficiencyState);
    setPrices(defaultPriceState);
  };

  const submitPrices = (e) => {
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
      console.log(ethanolCost, petrolCost);
      if (ethanolCost < petrolCost) {
        return setisPetrol(false);
      } else if (ethanolCost > petrolCost) {
        return setisPetrol(true);
      } else {
        setDraw(true);
      }
    }
  };

  return (
    <>
      <header className="headerContainer">
        <h1 className="mainTitle">Fuel Choice</h1>
        <p className="mainDescription">
          Decide between gasoline and ethanol by comparing their cost-effectiveness based on current prices and vehicle
          efficiency.
        </p>
        <p className="mainDescription"> Make informed fuel choices to save money and reduce environmental impact.</p>
      </header>
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
            <label className="label" htmlFor="petrol">
              Petrol Price
            </label>
            <input
              onChange={(e) => {
                setPrices({ ...prices, petrol: e.target.value });
              }}
              type="number"
              id="petrol"
            />
          </div>
          {!isSimplified && (
            <div className="inputContainer">
              <label className="label" htmlFor="petrol">
                Petrol efficiency km/l
              </label>
              <input
                onChange={(e) => {
                  setEfficiency({ ...efficiency, onPetrol: e.target.value });
                }}
                type="number"
                id="petrol"
              />
            </div>
          )}
          <div className="inputContainer">
            <label className="label" htmlFor="ethanol">
              Ethanol Price
            </label>
            <input
              onChange={(e) => {
                setPrices({ ...prices, ethanol: e.target.value });
              }}
              type="number"
              id="ethanol"
            />
          </div>
          {!isSimplified && (
            <div className="inputContainer">
              <label className="label" htmlFor="ethanol">
                Ethanol efficiency km/l
              </label>
              <input
                onChange={(e) => {
                  setEfficiency({ ...efficiency, onEthanol: e.target.value });
                }}
                type="number"
                id="ethanol"
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
    </>
  );
}
