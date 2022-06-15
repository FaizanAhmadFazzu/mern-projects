import { Category, ChartComponent, ColumnSeries, Crosshair, DateTime, HiloSeries, Inject, Legend, Logarithmic, RangeColorSettingDirective, RangeColorSettingsDirective, SeriesCollectionDirective, SeriesDirective, Tooltip, Zoom } from '@syncfusion/ej2-react-charts';
import React from 'react';
import { ChartsHeader } from "../../components";
import { useStateContext } from '../../context/ContextProvider';
import {colorMappingData, ColorMappingPrimaryXAxis, ColorMappingPrimaryYAxis, financialChartData, rangeColorMapping } from '../../data/dummy';

const date1 = new Date("2017, 1, 1")

function filterValue(value) {
    if(value.x >= date1) {
        return value.x, value.high, value.low
    }
}

const returnValue =financialChartData.filter(filterValue);

const ColorMapping
 = () => {
  const { currentMode } = useStateContext()

  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <ChartsHeader category="Color Mapping" title="USA CLIMATE - WEATHER BY MONTH" />
      <div className='w-full'>
        <ChartComponent
          id="charts"
          primaryXAxis={ColorMappingPrimaryXAxis}
          primaryYAxis={ColorMappingPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          legendSettings={{ mode: "Range", background: "white" }}
          tooltip={{ enable: true }}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
        >
          <Inject services={[ColumnSeries, Tooltip, Category, Legend]} />
          <SeriesCollectionDirective>
           <SeriesDirective 
                dataSource={colorMappingData[0]}
                xName="x"
                yName="y"
                name="USA"
                type="Column"
                cornerRadius={{
                    topLeft: 10,
                    topRight: 10
                }}
           />
          </SeriesCollectionDirective>
          <RangeColorSettingsDirective>
              {
                  rangeColorMapping.map((item, index) => <RangeColorSettingDirective key={index} {...item} />)
              }
          </RangeColorSettingsDirective>
        </ChartComponent>
      </div>
    </div>
  )
}

export default ColorMapping
