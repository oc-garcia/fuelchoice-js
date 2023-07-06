export default function HistoryCard(Props) {
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
    <li>
      <p>{Props.log.petrolCost}</p>
      <p>{Props.log.petrolEfficiency}</p>
      <p>{Props.log.ethanolCost}</p>
      <p>{Props.log.ethanolEfficiency}</p>
      {getResult(Props.log)}
    </li>
  );
}
