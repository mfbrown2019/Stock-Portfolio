import React from "react";
import "../CSS/Patterns.css";

function Patterns() {
    const items = [];
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace("./", "")] = r(item);
            return images;
        });
        return images;
    }

    const images = importAll(
        require.context("../PICTURES", false, /\.(png|jpe?g|svg)$/)
    );
    for (const [, [, value]] of Object.entries(Object.entries(images))) {
        items.push(value);
    }
    console.log(items);
    return (
        <div className="PatternsPage">
            {items.map((item, index) => {
                return <img src={item} alt="Trading Pattern"></img>;
            })}
        </div>
    );
}

export default Patterns;
