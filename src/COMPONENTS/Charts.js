import React from "react";
import "../CSS/Charts.css";
import { AdvancedChart, Screener, MiniChart } from "react-tradingview-embed";

function Charts() {
    const stocks = [
        "NYSE:F",
        "NYSE:GME",
        "AMEX:SPY",
        "NASDAQ:TSLA",
        "NYSE:NIO",
        "NASDAQ:FB",
        "NYSE:TWTR",
        "NASDAQ:PYPL",
        "NYSE:BA",
        "NASDAQ:EBAY",
        "NYSE:SPOT",
        "NYSE:DASH",
        "NYSE:MA",
        "NYSE:KO",
        "NASDAQ:RIOT",
        "NYSE:NKE",
    ];
    return (
        <div className="ChartPage">
            <div className="Chart">
                <div className="chart1">
                    <AdvancedChart
                        widgetProps={{
                            autosize: true,
                            height: "100%",
                            width: "100%",
                            symbol: "NASDAQ:AAPL",
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
            <div className="Screener">
                <div className="screen">
                    <Screener
                        widgetProps={{
                            autosize: true,
                            // height: "1000px",

                            defaultColumn: "overview",
                            defaultScreen: "most_capitalized",
                            market: "america",
                            showToolbar: true,
                            colorTheme: "dark",
                            locale: "en",
                        }}
                    />
                </div>
            </div>
            <div className="MassCharts">
                {stocks.map((item, index) => {
                    return (
                        <MiniChart
                            key={index}
                            widgetProps={{
                                symbol: item,
                                autosize: true,
                                width: "100%",
                                height: "100%",
                                locale: "en",
                                dateRange: "1D",
                                colorTheme: "dark",
                                trendLineColor: "rgba(0, 255, 0, 1)",
                                underLineColor: "rgba(164, 194, 244, 0.3)",
                                underLineBottomColor: "rgba(41, 98, 255, 0)",
                                isTransparent: false,
                                largeChartUrl: "",
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Charts;
