import "../CSS/Home.css";
import { SymbolOverview } from "react-tradingview-embed";
import tempPhoto from "../headShot.png";
import { useState, useEffect } from "react";
function App() {
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [detailsData, setDetailsData] = useState({});
    const [positionsData, setPositionData] = useState({});
    const [tickers, setTickers] = useState([["SPY", "SPY|1D"]]);

    console.log(publicKey, privateKey);

    useEffect(() => {
        const interval = setInterval(() => {
            var myHeaders = new Headers();
            myHeaders.append("APCA-API-KEY-ID", "PKNPVZ48NRX8EQ39UKIS");
            myHeaders.append(
                "APCA-API-SECRET-KEY",
                "Wit3VNit8dXELdNYfuTMDdZld1ewczuJjx2O8Ufu"
            );

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            fetch("https://paper-api.alpaca.markets/v2/account", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setDetailsData(result);
                    // console.log("here", detailsData);
                })
                .catch((error) => console.log("error", error));

            fetch(
                "https://paper-api.alpaca.markets/v2/positions",
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    setPositionData(result);
                    // console.log("here", positionsData);

                    if (tickers.length < 2) {
                        result.map((item) => {
                            let temp = tickers;
                            temp.push([item.symbol, item.symbol + "|1D"]);
                            setTickers(temp);
                            return temp;
                        });
                    }
                    // console.log(tickers);
                })
                .catch((error) => console.log("error", error));
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    const getDetails = async (e) => {};
    // console.log(detailsData);
    return (
        <div className="Home">
            <img className="winrate" src={tempPhoto} alt="winrate"></img>
            <div className="details-home">
                <div className="two-home">
                    <p>Account Number - </p>
                    <p>{detailsData.account_number}</p>
                </div>
                <div className="three-home">
                    <p>Equity - </p>
                    <p>{"$" + detailsData.equity}</p>
                </div>
                <div className="four-home">
                    <p>Buying Power - </p>
                    <p>{"$" + detailsData.buying_power}</p>
                </div>
                <div className="five-home">
                    <p>PDT - </p>
                    <p>{detailsData.daytrade_count}</p>
                </div>
            </div>

            <div className="chart-home">
                <SymbolOverview
                    widgetProps={{
                        isTransparent: true,
                        width: "100%",
                        height: "100%",
                        symbols: tickers,
                        theme: "dark",
                    }}
                />
            </div>
            <div className="positions">
                <div className="title">
                    <div>Positions</div>
                </div>
                <div className="position-items">
                    {positionsData.length > 0 ? (
                        positionsData.map((item) => {
                            return (
                                <div className="asset">
                                    <div className="symbol">{item.symbol}</div>
                                    <div className="class">
                                        <div>Exchange:</div>
                                        <div>{item.exchange}</div>
                                    </div>
                                    <div className="avg_price">
                                        <div>Avg Price:</div>
                                        <div>
                                            $
                                            {parseInt(
                                                item.avg_entry_price
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="qty">
                                        <div>Shares:</div>
                                        <div>{item.qty}</div>
                                    </div>
                                    <div className="side">
                                        <div>Side:</div> <div>{item.side}</div>
                                    </div>
                                    <div className="value">
                                        <div>Total Value:</div>
                                        <div>
                                            $
                                            {parseInt(
                                                item.market_value
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="unrealized_pl">
                                        <div>P&L:</div>
                                        <div>${item.unrealized_pl}</div>
                                    </div>
                                    <div className="unrealized_interday_pl">
                                        <div>Today P&L:</div>
                                        <div>
                                            ${item.unrealized_intraday_pl}
                                        </div>
                                    </div>
                                    <div className="price">
                                        <div>Current Price:</div>
                                        <div>${item.current_price}</div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;

// symbol: "GME",

// asset_class: "NASDAQ",
// qty: "5",
// side: "long",
// avg_entry_price: "434.0",

// market_value: "600.0",
// unrealized_pl: "100.0",
// unrealized_intraday_pl: "10.0",
// current_price: "120.0",
