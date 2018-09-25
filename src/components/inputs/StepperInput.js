import React from "react";
import Slider, { Range } from "rc-slider";
import Icon from "react-fa";

export default () => {
  return (
    <table cellPadding={0} cellSpacing={0} className="question">
      <tr>
        <th>stepper</th>
      </tr>
      <tr>
        <td className="center">center</td>
      </tr>
      <tr>
        <td>
          <div className="stepper-wrapper">
            <button className="stepper-button">
              <Icon name="minus" className="stepper-button-icon" />
            </button>
            <div className="stepper">
              <Slider
                dots
                min={0}
                max={10}
                step={1}
                className="my-slider"
                railStyle={{ backgroundColor: "white" }}
                trackStyle={{ backgroundColor: "white" }}
                dotStyle={{
                  border: "1px solid #7FB150"
                }}
                activeDotStyle={{
                  backgroundColor: "#7FB150",
                  border: "none"
                }}
                handleStyle={{
                  backgroundColor: "#7FB150",
                  borderColor: "#7FB150"
                }}
              />
            </div>
            <button className="stepper-button">
              <Icon name="plus" className="stepper-button-icon" />
            </button>
          </div>
        </td>
      </tr>
    </table>
  );
};
