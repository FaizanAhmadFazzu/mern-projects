import React from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip, colorNameToHex } from "@syncfusion/ej2-react-charts";
import { useStateContext } from '../../context/ContextProvider';

const Doughnut = ({ id, data, legendVisiblity, height }) => {
    const { currentMode } = useStateContext();
  return (
    <AccumulationChartComponent
    id={id}
    legendSettings={{ visible: legendVisiblity, background: "white" }}
    height={height}
    background={currentMode === "Dark" ? "#33373E" : "#fff" }
    tooltip={{ enable: true }}
    >
        <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
        <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective 
                name="Sale"
                dataSource={data}
                xName="x"
                yName="y"
                innerRadius="40%"
                startAngel={0}
                endAngel={360}
                radius="70%"
                explode
                explodeOffset="10%"
                explodeIndex={2}
                dataLabel={{
                    visible: true,
                    position: "Inside",
                    font: {
                        fontWeight: "600",
                        color: "#fff"
                    }
                }}

            />
        </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  )
}

export default Doughnut