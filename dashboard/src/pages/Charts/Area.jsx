import { ChartComponent, DateTime, Inject, Legend, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries } from '@syncfusion/ej2-react-charts';
import React from 'react';
import { ChartsHeader } from "../../components";
import { useStateContext } from '../../context/ContextProvider';
import { areaCustomSeries, areaPrimaryXAxis, areaPrimaryYAxis } from '../../data/dummy';

const Area = () => {
  const { currentMode } = useStateContext()

  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <ChartsHeader category="
      Area" title="Inflation Rate in percentage" />
      <div className='w-full'>
        <ChartComponent
          id="charts"
          primaryXAxis={areaPrimaryXAxis}
          primaryYAxis={areaPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
          legendSettings={{ background: "white" }}
        >
          <Inject services={[SplineAreaSeries, DateTime, Legend]} />
          <SeriesCollectionDirective>
            {
              areaCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)
            }
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  )
}

export default Area