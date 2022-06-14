import React from "react";
import "../CSS/History.css";
import { useState, useEffect } from "react";
function History() {
    const [date, setDate] = useState("");
    const [symbol, setSymbol] = useState("");
    const [buy, setBuy] = useState("");
    const [sell, setSell] = useState("");
    const [shares, setShares] = useState("");
    const [time, setTime] = useState("");
    const [note, setNote] = useState("");
    const [side, setSide] = useState("");
    const [history, setHistory] = useState("1");
    const [winner, setWinner] = useState(0);
    const [losers, setLosers] = useState(0);
    const [totalPL, setTotalPL] = useState(0.0);
    const [totalTrades, setTotalTrades] = useState(0);
    const [winPercent, setWinPercent] = useState(0);
    const [requiredPercent, setRequriedPercent] = useState(0);
    const [avgWinner, setAvgWinner] = useState(0);
    const [avgLoser, setAvgLoser] = useState(0);
    const [avgTime, setAvgTime] = useState(0);
    const [avgROI, setAvgROI] = useState(0);
    const [investment, setInvestment] = useState(0);
    const [avgDay, setAvgDay] = useState(0);
    const [avgSLPL, setAvgSLPL] = useState([0, 0, 0, 0]);
    const categories = [
        "Side",
        "Date",
        "Ticker",
        "Buy Price",
        "Sell Price",
        "Shares",
        "Total Time",
        "P & L",
        "ROI",
        "Notes",
    ];
    console.log(side);

    useEffect(() => {
        fetch(" http://localhost:8000/all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((result) => {
                let temp = 0;
                let time = 0;
                let trades = 0;
                let roi = 0;
                let days = [];
                let invest = 0;
                let tempSL = [0, 0, 0, 0, 0, 0, 0, 0];
                // [avgwinShort, avglossShort, avgWinLong, avglossLong]

                result.map((item) => {
                    temp += parseFloat(item.pl);
                    // console.log(item.pl);

                    trades += 1;
                    time += parseFloat(item.time);
                    roi += parseFloat(item.roi);
                    invest += parseFloat(item.buy) * item.shares;
                    if (!days.includes(item.date)) {
                        days.push(item.date);
                    }

                    if (item.pl > 0 && item.side == "Short") {
                        tempSL[0] += parseFloat(item.pl);
                        tempSL[4] += 1;
                    } else if (item.pl < 0 && item.side == "Short") {
                        tempSL[1] += parseFloat(item.pl);
                        tempSL[5] += 1;
                    } else if (item.pl > 0 && item.side == "Long") {
                        tempSL[2] += parseFloat(item.pl);
                        tempSL[6] += 1;
                    } else if (item.pl < 0 && item.side == "Long") {
                        tempSL[3] += parseFloat(item.pl);
                        tempSL[7] += 1;
                    }

                    return;
                });

                invest /= result.length;
                time /= result.length;
                roi /= result.length;
                setAvgROI(roi);
                setAvgTime(time);
                setTotalPL(temp);
                setTotalTrades(trades);
                setInvestment(invest);

                setAvgDay(totalPL / days.length);
                tempSL[0] /= tempSL[4];
                tempSL[1] /= tempSL[5];
                tempSL[2] /= tempSL[6];
                tempSL[3] /= tempSL[7];
                setAvgSLPL(tempSL);
            })
            .catch((error) => console.log("error", error));

        fetch(" http://localhost:8000/winners", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((result) => {
                let temp = 0;
                setWinner(result.length);
                result.map((item) => {
                    temp += parseFloat(item.pl);
                });
                temp /= winner;
                console.log(temp);
                setAvgWinner(temp);
            })

            .catch((error) => console.log("error", error));

        fetch(" http://localhost:8000/losers", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((result) => {
                setLosers(result.length);
                let temp = 0;

                result.map((item) => {
                    temp += parseFloat(item.pl);
                });
                temp /= losers;
                console.log(temp);
                setAvgLoser(temp);
            })
            .catch((error) => console.log("error", error));

        let winp = (winner / totalTrades) * 100;
        setWinPercent(winp);
        let required =
            (1 /
                (avgWinner / (avgLoser * -1)) /
                (1 / (avgWinner / (avgLoser * -1)) + 1)) *
            100;
        setRequriedPercent(required);
    }, [history]);

    const addItem = async () => {
        if (buy == "") {
            return;
        }
        let roi =
            (((parseFloat(sell) - parseFloat(buy)) * parseFloat(shares)) /
                (parseFloat(buy) * parseFloat(shares))) *
            100;

        console.log(roi);
        let win = 1;
        if (parseFloat(sell) - parseFloat(buy) >= 0) {
            win = 1;
        } else {
            win = 0;
        }
        let pl = (
            (parseFloat(sell) - parseFloat(buy)) *
            parseFloat(shares)
        ).toFixed(2);
        if (side == "Short") {
            roi = roi * -1;
            win = win + (1 % 2);
            pl = (
                (parseFloat(buy) - parseFloat(sell)) *
                parseFloat(shares)
            ).toFixed(2);
        }

        const raw = {
            id: Math.random(),
            date: date,
            symbol: symbol,
            buy: parseFloat(buy),
            sell: parseFloat(sell),
            shares: parseFloat(shares),
            time: time,
            note: note,
            pl: pl,
            side: side,
            roi: roi.toFixed(2).toString() + "%",
            win: win,
        };

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(raw),
        };

        await fetch(" http://localhost:8000/all", requestOptions);
        if (win == 1) {
            await fetch(" http://localhost:8000/winners", requestOptions);
        } else {
            await fetch(" http://localhost:8000/losers", requestOptions);
        }
        setDate("");
        setSymbol("");
        setBuy("");
        setSell("");
        setShares("");
        setTime("");
        setNote("");
        fetch(" http://localhost:8000/all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((result) => {
                setHistory(result);
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    };

    const getAllTrades = () => {
        fetch(" http://localhost:8000/all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((result) => {
                setHistory(result);
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    };
    const getWinningTrades = () => {
        fetch(" http://localhost:8000/winners", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((result) => {
                setHistory(result);
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    };
    const getLosingTrades = () => {
        fetch(" http://localhost:8000/losers", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((result) => {
                setHistory(result);
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    };
    console.log(winner, losers);
    return (
        <div className="HistoryPage">
            <div className="side-history">
                <div className="long-box">
                    <div>Long</div>
                    <input
                        type="checkbox"
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSide("");
                                setSide("Long");
                            } else {
                                setSide("Short");
                            }
                        }}
                    ></input>
                </div>
                <div className="short-box">
                    <div>Short</div>
                    <input
                        type="checkbox"
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSide("");
                                setSide("Short");
                            } else {
                                setSide("Long");
                            }
                        }}
                    ></input>
                </div>
            </div>
            <input
                className="date-history"
                placeholder="Date"
                onChange={(e) => {
                    setDate(e.target.value);
                }}
                value={date}
            />
            <input
                className="symbol-history"
                placeholder="Ticker"
                onChange={(e) => {
                    setSymbol(e.target.value);
                }}
                value={symbol}
            />
            <input
                className="buy-history"
                placeholder="Buy Price"
                onChange={(e) => {
                    setBuy(e.target.value);
                }}
                value={buy}
            />
            <input
                className="sell-history"
                placeholder="Sell Price"
                onChange={(e) => {
                    setSell(e.target.value);
                }}
                value={sell}
            />
            <input
                className="shares-history"
                placeholder="Shares"
                onChange={(e) => {
                    setShares(e.target.value);
                }}
                value={shares}
            />
            <input
                className="time-history"
                placeholder="Total Time"
                onChange={(e) => {
                    setTime(e.target.value);
                }}
                value={time}
            />
            <textarea
                className="note-history"
                placeholder="Enter Note...."
                onChange={(e) => {
                    setNote(e.target.value);
                }}
                value={note}
            />
            <button className="submit-history" onClick={addItem}>
                Submit
            </button>
            <button className="Winners-filter" onClick={getWinningTrades}>
                Winners
            </button>
            <button className="All-filter" onClick={getAllTrades}>
                All
            </button>
            <button className="Losers-filter" onClick={getLosingTrades}>
                Losers
            </button>

            <div className="history-stats">
                <div className="winlossR">Win Rate</div>
                <div className="winlossrate">
                    {winner} - {losers}
                </div>
                <div className="winlossP">Win Percentage</div>
                {winPercent > requiredPercent ? (
                    <div className="winlosspercentGreen">
                        {winPercent.toFixed(1)}%
                    </div>
                ) : (
                    <div className="winlosspercentRed">
                        {winPercent.toFixed(1)}%
                    </div>
                )}

                <div className="avgW">Average Win</div>
                <div className="avgWnumber">${avgWinner.toFixed(2)}</div>
                <div className="avgL">Average Loss</div>
                <div className="avgLnumber">${avgLoser.toFixed(2) * -1}</div>
                <div className="PL">P & L</div>
                {totalPL > 0 ? (
                    <div className="plNumberGreen">${totalPL.toFixed(2)}</div>
                ) : (
                    <div className="plNumberRed">${totalPL.toFixed(2)}</div>
                )}
                <div className="required">Required Win %</div>
                <div className="requiredNumber">
                    {requiredPercent.toFixed(1)}%
                </div>
                <div className="avgTime">Average Time</div>
                <div className="avgTimeNumber">{avgTime.toFixed(0)} sec</div>
                <div className="avgROI">Average ROI</div>
                {avgROI > 0 ? (
                    <div className="avgROINumberGreen">
                        {avgROI.toFixed(2)}%
                    </div>
                ) : (
                    <div className="avgROINumberRed">{avgROI.toFixed(2)}%</div>
                )}

                <div className="avgInvestment">Average Investment</div>
                <div className="avgInvestmentNumber">
                    ${investment.toFixed(2)}
                </div>

                <div className="avgDayProfit">Average Day</div>
                {avgDay > 0 ? (
                    <div className="avgDayProfitGreen">
                        ${avgDay.toFixed(2)}
                    </div>
                ) : (
                    <div className="avgDayProfitRed">${avgDay.toFixed(2)}</div>
                )}

                <div className="avgWinShort">Average Short Win</div>

                <div className="avgWinShortNumber">
                    ${avgSLPL[0].toFixed(2)}
                </div>

                <div className="avgLossShort">Average Short Loss</div>

                <div className="avgLossShortNumber">
                    ${avgSLPL[1].toFixed(2) * -1}
                </div>

                <div className="avgWinLong">Average Long Win</div>

                <div className="avgWinLongtNumber">
                    ${avgSLPL[2].toFixed(2)}
                </div>

                <div className="avgLossLong">Average Long Loss</div>

                <div className="avgLossLongtNumber">
                    ${avgSLPL[3].toFixed(2) * -1}
                </div>
            </div>

            <div className="history-info">
                {categories.map((category) => {
                    return (
                        <div className={"history-" + category}>
                            <div>{category}</div>
                        </div>
                    );
                })}

                <div className="history-display">
                    {history == 1 ? (
                        <div></div>
                    ) : (
                        history
                            .slice()
                            .reverse()
                            .map((item, index) => {
                                return (
                                    <div
                                        className={
                                            "history-items alter" + (index % 2)
                                        }
                                    >
                                        <div className="center">
                                            {item.side}
                                        </div>
                                        <div className="center">
                                            {item.date}
                                        </div>
                                        <div className="center">
                                            {item.symbol}
                                        </div>
                                        <div className="center">{item.buy}</div>
                                        <div className="center">
                                            {item.sell}
                                        </div>
                                        <div className="center">
                                            {item.shares}
                                        </div>
                                        <div className="center">
                                            {item.time}
                                        </div>
                                        <div className="center">{item.pl}</div>
                                        <div className="center">{item.roi}</div>
                                        <div className="left">{item.note}</div>
                                    </div>
                                );
                            })
                    )}
                </div>
            </div>
        </div>
    );
}

export default History;
