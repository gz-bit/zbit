import { GetStaticProps } from 'next'
import { useState } from 'react'
import styles from '../index.module.css'
import { NavHeader } from "../../components"
import { GoDataAndPrice, GoTariff } from '@zbit/octopus/shared'

const Octopus = (props: GoTariff) => {


  const api = "http://localhost:3333/octopus"
  /*
    const api = process.env.NX_OCTOPUS_API
    console.log(api)
    this logs api in the terminal and undefined in the browser
  */

  const initialGoData: GoDataAndPrice  = {
    error: false,
    message: '',
    date: '', // 10/2022 or Year 2022
    useLow: '',
    useHigh: '',
    useTotal: '',
    priceLow: '',
    priceHigh: '',
    priceDayGo: '',
    priceGo: '',
    pricePowerFlex: '',
    priceDayFlex: '',
    priceFlex: '',
    savedByGo: '',
    days: ''
  }


  const [year, setYear] = useState(props.year)
  const [month, setMonth] = useState(props.month)
  const [day, setDay] = useState(props.day)
  const [lowStart, setLowStart] = useState(props.lowStart)
  const [lowEnd, setLowEnd] = useState(props.lowEnd)
  const [lowPrice, setLowPrice] = useState(props.lowPrice)
  const [highPrice, setHighPrice] = useState(props.highPrice)
  const [flexPrice, setFlexPreis] = useState(props.flexPrice)
  const [dayGo, setDayGo] = useState(props.dayGo)
  const [dayFlex, setDayFlex] = useState(props.dayFlex)
  const [goData, setGoData] = useState(initialGoData)
  const [errorMessage, setErrorMessage] = useState('')

  const getData = () => {
    const newTariff: GoTariff = {
      year, month, day, lowStart, lowEnd, lowPrice, highPrice, flexPrice, dayGo, dayFlex
    }

    // save changes to tariff
    if (JSON.stringify(newTariff) !== JSON.stringify(props)) {
      saveTariff(newTariff)
    }

    // get comsumption data from Octopus
    fetch(api + '/getData')
      .then(res => res.json())
      .then(data => setGoData(data))
  }

  const saveTariff = (tariff: GoTariff) => {
    console.log(JSON.stringify(tariff))
    fetch (api + '/saveTariff', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(tariff)
    })
      .then(res => res.json())
      .then(data => {
        if (data.Error) {
          console.log(data)
          setErrorMessage('Error: Changed data have not been saved!')
        }
      })
      .catch(err => {
        setErrorMessage(err.toString())
      })
    ;

  }

  const errorOff = () => setErrorMessage('')

  return (
    <div className="all">
      <NavHeader active='octopus'/>
      <h2>Octopus</h2>
      <h4>Required Data</h4>
      <table className="perm">
        <tbody>
          <tr>
            <td><label htmlFor="year">Year</label></td>
            <td><input type="number" min="2000" max="2999" id="year" name="year"
                  required value={year}
                  onChange={(e) => setYear(e.target.value)}
            /></td>
            <td><label htmlFor="month">Month</label></td>
            <td><input type="number" min="00" max="12" id="month" name="month"
                  required value={month}
                  onChange={(e) => setMonth(e.target.value)}
            /></td>
            <td><label htmlFor="day">Day</label></td>
            <td><input type="number" min="00" max="31" id="day" name="day"
                  required value={day}
                  onChange={(e) => setDay(e.target.value)}
            /></td>
          </tr>
          <tr>
            <td><label htmlFor="ops">Off Peak starts</label></td>
            <td><input type="time" id="ops" name="ops"
                  required value={lowStart}
                  onChange={(e) => setLowStart(e.target.value)}
            /></td>
            <td><label htmlFor="ope">Off Peak ends</label></td>
            <td><input type="time" id="ope" name="ope"
                  required value={lowEnd}
                  onChange={(e) => setLowEnd(e.target.value)}
            /></td>
          </tr>
          <tr>
            <td><label htmlFor="opprice">Off Peak price</label></td>
            <td><input type="number" max="1" id="opprice" name="oprice"
                  required value={lowPrice}
                  onChange={(e) => setLowPrice(e.target.value)}
            /></td>

            <td><label htmlFor="pkprice">Peak price</label></td>
            <td><input type="number" max="1" id="pkprice" name="pkprice"
                  required value={highPrice}
                  onChange={(e) => setHighPrice(e.target.value)}
            /></td>
          </tr>
          <tr>
            <td><label htmlFor="file">Flexible Tariff</label></td>
            <td><input type="text" id="flprice" name="flprice"
                  required value={flexPrice}
                  onChange={(e) => setFlexPreis(e.target.value)}
            /></td>
          </tr>
          <tr>
            <td><label htmlFor="opprice">Per Day Flex</label></td>
            <td><input type="number" max="1" id="dayflex" name="dayflex"
                  required value={dayFlex}
                  onChange={(e) => setDayFlex(e.target.value)}
            /></td>

            <td><label htmlFor="pkprice">Per Day Go</label></td>
            <td><input type="number" max="1" id="daygo" name="daygo"
                  required value={dayGo}
                  onChange={(e) => setDayGo(e.target.value)}
            /></td>
          </tr>
        </tbody>
      </table>

      <br />
      <button onClick={getData}>Get Required Data</button>

      {errorMessage
        ? <div className={styles.error}>
            {errorMessage}
            &nbsp;&nbsp;
            <button onClick={errorOff}>OK</button>
          </div>
       :  <div><br /><br /></div>
      }

      <div className={styles.data}>
        <h4>Go Tariff Consumption Data</h4>
        <table align="center" border={1}>
          <thead>
            <tr>
              <th className='pad_left'>What</th>
              <th>Usage</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
              <tr key='Datun'>
                <td>Datum</td>
                <td>{goData.date}</td>
                <td></td>
                <td></td>
              </tr>
              <tr key='Low Price'>
                <td>Low Price</td>
                <td>{goData.useLow}</td>
                <td>{lowPrice}</td>
                <td>{goData.priceLow}</td>
              </tr>
              <tr key='High Price'>
                <td>High Price</td>
                <td>{goData.useHigh}</td>
                <td>{highPrice}</td>
                <td>{goData.priceHigh}</td>
              </tr>
              <tr key='Days Go'>
                <td>Days Go</td>
                <td>{goData.days}</td>
                <td>{dayGo}</td>
                <td>{goData.priceDayGo}</td>
              </tr>
              <tr key='Total Go'>
                <td>Total Go</td>
                <td></td>
                <td></td>
                <td>{goData.priceGo}</td>
              </tr>
              <tr key='Power Flex'>
                <td>Power Flex</td>
                <td>{goData.useTotal}</td>
                <td>{flexPrice}</td>
                <td>{goData.pricePowerFlex}</td>
              </tr>
              <tr key='Days Flex'>
                <td>Days Flex</td>
                <td>{goData.days}</td>
                <td>{dayFlex}</td>
                <td>{goData.priceDayFlex}</td>
              </tr>
              <tr key='Total Flex'>
                <td>Total Flex</td>
                <td></td>
                <td></td>
                <td>{goData.priceFlex}</td>
              </tr>
              <tr key='Saved By Go'>
                <td>Saved By Go</td>
                <td></td>
                <td></td>
                <td>{goData.savedByGo}</td>
              </tr>
          </tbody>

        </table>
      </div>
    </div>
  )
}
export default Octopus

export const getStaticProps: GetStaticProps<GoTariff> = async (context) => {

    let tariff: GoTariff
    await fetch('http://localhost:3333/octopus/getTariff', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => tariff = data)
    ;

    return { props: tariff }
  }
;

// let saved
// fetch('http://localhost:3333/octopus/tariff')
//   .then((res) => res.json())
//   .then((data) => {
//     saved = data
//     console.log(data)
//     console.log({ props: saved})
//   })
// ;

