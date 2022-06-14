import React from "react";
import App from "./App";
import Charts from "./Charts";
import Patterns from "./Patterns";
import History from "./History";
import Trade from "./Trade";

import { Routes, Route } from "react-router-dom";
import "../CSS/Home.css";
import { TickerTape } from "react-tradingview-embed";
function Router() {
    return (
        <div>
            <div className="navbar">
                <a href="/">Home</a>
                <a href="/history">History</a>
                <a href="/patterns">Patterns</a>
                <a href="/charts">Charts</a>
                <a href="/trade">Trade</a>
            </div>
            <div className="tape">
                <TickerTape
                    widgetProps={{
                        symbols: [
                            {
                                description: "Tesla",
                                proName: "NASDAQ:TSLA",
                            },
                            {
                                description: "Apple",
                                proName: "NASDAQ:AAPL",
                            },
                            {
                                description: "Amazon",
                                proName: "NASDAQ:AMZN",
                            },
                            {
                                description: "Nvidia",
                                proName: "NASDAQ:NVDA",
                            },
                            {
                                description: "Microsoft",
                                proName: "NASDAQ:MSFT",
                            },
                            {
                                description: "GameStop",
                                proName: "NYSE:GME",
                            },
                            {
                                description: "Netflix",
                                proName: "NASDAQ:NFLX",
                            },
                            {
                                description: "Coinbase",
                                proName: "NASDAQ:COIN",
                            },
                            {
                                description: "Google",
                                proName: "NASDAQ:GOOGL",
                            },
                            {
                                description: "Twitter",
                                proName: "NYSE:TWTR",
                            },
                            {
                                description: "PayPal",
                                proName: "NASDAQ:PYPL",
                            },
                            {
                                description: "Boeing",
                                proName: "NYSE:BA",
                            },
                            {
                                description: "Disney",
                                proName: "NYSE:DIS",
                            },
                            {
                                description: "Home Depot",
                                proName: "NYSE:HD",
                            },
                            {
                                description: "Ford",
                                proName: "NYSE:F",
                            },
                            {
                                description: "General Electric",
                                proName: "NYSE:GE",
                            },
                            {
                                description: "EBAY",
                                proName: "NASDAQ:EBAY",
                            },
                            {
                                description: "Spotify",
                                proName: "NYSE:SPOT",
                            },
                            {
                                description: "VMware",
                                proName: "NYSE:VMW",
                            },
                            {
                                description: "Door Dash",
                                proName: "NYSE:DASH",
                            },
                            {
                                description: "Waste Management",
                                proName: "NYSE:WM",
                            },
                            {
                                description: "Zoom",
                                proName: "NASDAQ:ZM",
                            },
                            {
                                description: "UPS",
                                proName: "NYSE:UPS",
                            },
                            {
                                description: "CVS",
                                proName: "NYSE:CVS",
                            },
                            {
                                description: "McDonanlds",
                                proName: "NYSE:MCD",
                            },
                            {
                                description: "Verizon",
                                proName: "NYSE:VZ",
                            },
                            {
                                description: "Mastercard",
                                proName: "NYSE:MA",
                            },
                            {
                                description: "Visa",
                                proName: "NYSE:V",
                            },
                            {
                                description: "SOFI",
                                proName: "NASDAQ:SOFI",
                            },
                            {
                                description: "General Moters",
                                proName: "NYSE:GM",
                            },
                            {
                                description: "Snapchat",
                                proName: "NYSE:SNAP",
                            },
                            {
                                description: "Facebook",
                                proName: "NASDAQ:FB",
                            },
                            {
                                description: "Lulu",
                                proName: "NASDAQ:LULU",
                            },
                            {
                                description: "Coke",
                                proName: "NYSE:KO",
                            },
                            {
                                description: "Pepsi",
                                proName: "NASDAQ:PEP",
                            },
                            {
                                description: "Nike",
                                proName: "NYSE:NKE",
                            },
                            {
                                description: "Walmart",
                                proName: "NYSE:WMT",
                            },
                            {
                                description: "Starbucks",
                                proName: "NASDAQ:SBUX",
                            },
                            {
                                description: "Riot",
                                proName: "NASDAQ:RIOT",
                            },
                            {
                                description: "NIO",
                                proName: "NYSE:NIO",
                            },
                            {
                                description: "FUBO",
                                proName: "NYSE:FUBO",
                            },
                            {
                                description: "Beyond Meat",
                                proName: "NASDAQ:BYND",
                            },
                            {
                                description: "AT&T",
                                proName: "NYSE:T",
                            },
                        ],
                        theme: "dark",
                    }}
                />
            </div>
            <Routes>
                <Route exact path="/" element={<App />}></Route>
                <Route exact path="/charts" element={<Charts />}></Route>
                <Route exact path="/patterns" element={<Patterns />}></Route>
                <Route exact path="/history" element={<History />}></Route>
                <Route exact path="/trade" element={<Trade />}></Route>
            </Routes>
        </div>
    );
}

export default Router;
