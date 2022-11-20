import { useState, useEffect } from 'react'
import { apiUrl, getTariff, getData } from '../functions'
import { GoTariff, GoDataAndPrice } from "@zbit/octopus/shared"
import css from './index.module.css'
import Link from 'next/link'

interface Props {
  goTariff: GoTariff
  goData: GoDataAndPrice
}

const Result = (props: Props) => {

  const { lowPrice, highPrice, flexPrice, dayGo, dayFlex } = props.goTariff
  const { goData } = props
  return (
    <div className="all">
      <h2>Octopus</h2>
    <div className={css.result}>
      <div className={css.data}>
        <h4>Go Tariff Consumption Data</h4>

        <table align="center" border={1}>
          <thead>
            <tr className={css.one}>
              <th className='pad_left'>What</th>
              <th>Usage</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr key='Datum' className={css.two}>
              <td>Datum</td>
              <td>{goData.date}</td>
              <td></td>
              <td></td>
            </tr>
            <tr key='Low Price'  className={css.one}>
              <td>Low Price</td>
              <td>{goData.useLow}</td>
              <td>{lowPrice}</td>
              <td>{goData.priceLow}</td>
            </tr>
            <tr key='High Price' className={css.two}>
              <td>High Price</td>
              <td>{goData.useHigh}</td>
              <td>{highPrice}</td>
              <td>{goData.priceHigh}</td>
            </tr>
            <tr key='Days Go' className={css.one}>
              <td>Days Go</td>
              <td>{goData.days}</td>
              <td>{dayGo}</td>
              <td>{goData.priceDayGo}</td>
            </tr>
            <tr key='Total Go' className={css.two}>
              <td>Total Go</td>
              <td></td>
              <td></td>
              <td>{goData.priceGo}</td>
            </tr>
            <tr key='Power Flex' className={css.one}>
              <td>Power Flex</td>
              <td>{goData.useTotal}</td>
              <td>{flexPrice}</td>
              <td>{goData.pricePowerFlex}</td>
            </tr>
            <tr key='Days Flex' className={css.two}>
              <td>Days Flex</td>
              <td>{goData.days}</td>
              <td>{dayFlex}</td>
              <td>{goData.priceDayFlex}</td>
            </tr>
            <tr key='Total Flex' className={css.one}>
              <td>Total Flex</td>
              <td></td>
              <td></td>
              <td>{goData.priceFlex}</td>
            </tr>
            <tr key='Saved By Go'  className={css.two}>
              <td>Saved By Go</td>
              <td></td>
              <td></td>
              <td>{goData.savedByGo}</td>
            </tr>
          </tbody>
        </table>
      </div>
        {goData.message 
          ? <div className={css.error}>
              {goData.message}
              &nbsp;&nbsp;
              <button>OK</button>
            </div>
          : <div><br /><br /></div>
        }
    
        <div className={css.row}>
          <Link className={css.button} href="/">OK</Link>
        </div>
      </div>

    </div>
  )

}
export default Result 

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const goTariff = await getTariff()
  const goData = await getData()
  return { props: { goTariff, goData } }
}