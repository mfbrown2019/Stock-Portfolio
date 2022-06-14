import React from "react";
import "../CSS/Trade.css";
import { AdvancedChart } from "react-tradingview-embed";
import { useState } from "react";
// import alpacahqAlpacaTradeApi from "https://cdn.skypack.dev/@alpacahq/alpaca-trade-api";

function Charts() {
    const [stock, setStock] = useState("NASDAQ:AAPL");
    const [inputs, setInputs] = useState("");
    const [ticker, setTicker] = useState("");
    const [qty, setQty] = useState("");
    const [limit, setLimit] = useState("");
    const [side, setSide] = useState("");
    const [type, setType] = useState("");
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");

    // app.use(cors());
    const placeOrder = async () => {
        if (limit === "") {
            setLimit(null);
        }
        console.log(ticker, qty, limit, side, type);
        var myHeaders = new Headers();
        myHeaders.append("APCA-API-KEY-ID", publicKey);
        myHeaders.append("APCA-API-SECRET-KEY", privateKey);

        var raw = JSON.stringify({
            symbol: ticker,
            qty: qty,
            notional: null,
            side: side,
            type: type,
            time_in_force: "day",
            limit_price: limit,
            stop_price: null,
            trail_price: null,
            trail_percent: null,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        await fetch(
            "https://paper-api.alpaca.markets/v2/orders",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    };

    return (
        <div className="TradePage">
            <div className="keys">
                <input
                    placeholder="Enter Public Key..."
                    onChange={(e) => {
                        e.preventDefault();
                        setPublicKey(e.target.value);
                    }}
                ></input>
                <input
                    placeholder="Enter Private Key..."
                    type="password"
                    onChange={(e) => {
                        e.preventDefault();
                        setPrivateKey(e.target.value);
                    }}
                ></input>
            </div>
            <div className="Panel">
                <div className="symbol-input">
                    <div>TICKER: </div>
                    <input
                        onChange={(e) => {
                            setTicker(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="qty-input">
                    <div>QTY: </div>
                    <input
                        onChange={(e) => {
                            setQty(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="side-input">
                    <div className="one">
                        <input
                            type="checkbox"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSide("");
                                    setSide("buy");
                                } else {
                                    setSide("");
                                }
                            }}
                        ></input>
                        <div>BUY</div>
                    </div>
                    <div className="two">
                        <input
                            type="checkbox"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSide("");
                                    setSide("sell");
                                } else {
                                    setSide("");
                                }
                            }}
                        ></input>
                        <div>SELL</div>
                    </div>
                </div>
                <div className="type-input">
                    <div className="one">
                        <input
                            type="checkbox"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setType("");
                                    setType("market");
                                } else {
                                    setType("");
                                }
                            }}
                        ></input>
                        <div>MARKET</div>
                    </div>
                    <div className="two">
                        <input
                            type="checkbox"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setType("");
                                    setType("limit");
                                } else {
                                    setType("");
                                }
                            }}
                        ></input>
                        <div>LIMIT</div>
                    </div>
                </div>
                <div className="limit-input">
                    <div>LIMIT PRICE: </div>
                    <input
                        onChange={(e) => {
                            setLimit(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="center">
                    <button onClick={placeOrder} className="submit-order">
                        Submit Order
                    </button>
                </div>
            </div>
            <div className="inputs">
                <input
                    type="text"
                    onChange={(e) => {
                        e.preventDefault();
                        setInputs(e.target.value);
                    }}
                ></input>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setStock(inputs);
                    }}
                >
                    Search
                </button>
            </div>
            <div className="chart">
                <AdvancedChart
                    widgetProps={{
                        autosize: true,
                        height: "100%",
                        width: "100%",
                        symbol: stock,
                        timezone: "America/New_York",
                        theme: "dark",
                        style: "1",
                        locale: "en",
                        toolbar_bg: "#f1f3f6",
                        enable_publishing: false,
                        withdateranges: true,
                        range: "1D",
                        hide_side_toolbar: false,
                        allow_symbol_change: true,
                        watchlist: ["NASDAQ:AAPL"],
                        // details: true,
                        hotlist: true,
                        calendar: true,
                        show_popup_button: true,
                        studies: ["RSI@tv-basicstudies"],
                    }}
                />
            </div>
        </div>
    );
}

export default Charts;
