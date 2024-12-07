"use client";

const TransactionCard = ({ tx }: { tx: any }) => {
  return (
    <div className="p-4 mb-4" style={{ borderBottom: "1px solid gray" }}>
      <span style={{ fontSize: "20px" }}> -&gt; {formatAddress(tx.txHash)}</span> <br />
      <span style={{ fontSize: "12px", marginLeft: "28px" }}>{timestampToTime(tx.timestamp)}</span>
      <span style={{ fontSize: "12px", marginLeft: "28px" }}> {timestampToDate(tx.timestamp)}</span>
      <span style={{ position: "absolute", fontSize: "17px", left: "280px", color: "#00CA1D" }}>
        {" "}
        {convertAmountToEther(tx.value)} ETH
      </span>
    </div>
  );
};

function formatAddress(address: any) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

function convertAmountToEther(amount: any) {
  return amount / 1000000000000000000;
}

function timestampToDateTime(timestamp: any) {
  var date = new Date(timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
}

// function timestampToDate(timestamp: any) {
//   var date = new Date(timestamp * 1000);
//   var year = date.getFullYear();
//   var month = "0" + (date.getMonth() + 1);
//   var day = "0" + date.getDate();
//   var formattedDate = year + "-" + month.substr(-2) + "-" + day.substr(-2);
//   return formattedDate;
// }

//timestamp === "2024-10-19T11:28:48.000000Z"

function timestampToDate(timestamp: any) {
  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = "0" + (date.getMonth() + 1);
  var day = "0" + date.getDate();
  var formattedDate = year + "-" + month.substr(-2) + "-" + day.substr(-2);
  return formattedDate;
}

function timestampToTime(timestamp: any) {
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
}

export default TransactionCard;
