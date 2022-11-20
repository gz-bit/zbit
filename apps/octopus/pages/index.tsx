import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import css from './index.module.css'
import { GoTariff, SaveResult } from '@zbit/octopus/shared'
import { getTariff, saveTariff } from '../functions'

interface SaveResult {
  Error?: ''
  OK?: ''  
}

const Octopus = (props: GoTariff) => {

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
  const [errorMessage, setErrorMessage] = useState('')

  const [save, setSave] = useState(false)

  const handleSave = async () => {
    const tariff: GoTariff = { year, month, day, lowStart, lowEnd, lowPrice, highPrice, flexPrice, dayGo, dayFlex }
    const result = await saveTariff(tariff)
    if (result.error) {
      setErrorMessage('Error: ' + result.message)
    }
    else {
      setErrorMessage(result.message)
    }
    setSave(false)
  }  

  const errorOff = () => setErrorMessage('')

  return (
    <div className="all">
      <h2>Octopus</h2>
      <div className={css.go}>

        <div className={css.price}>    

          <h3 className={css.row}>Octopus Go</h3>
         
          <div className={css.row}>   
            <label className={css.label} htmlFor="opprice">Low Price</label>
            <input className={css.input} type="number" max="1" id="opprice" name="oprice"
                    required value={lowPrice}
                    onChange={(e) => {setLowPrice(e.target.value); setSave(true)}} />
          </div>

          <div className={css.row}>
            <label className={css.label} htmlFor="ops">starts</label>
            <input className={css.input} type="time" id="ops" name="ops"
                    required value={lowStart}
                    onChange={(e) => {setLowStart(e.target.value); setSave(true)}} />
            <label className={css.label} htmlFor="ope">ends</label>
            <input className={css.input} type="time" id="ope" name="ope"
                    required value={lowEnd}
                    onChange={(e) => {setLowEnd(e.target.value); setSave(true)}} />
          </div>

          <div className={css.row}>
            <label className={css.label} htmlFor="pkprice">High Price</label>
            <input className={css.input} type="number" max="1" id="pkprice" name="pkprice"
                    required value={highPrice}
                    onChange={(e) => {setHighPrice(e.target.value); setSave(true)}} />
            <label className={css.label} htmlFor="pkprice">£ per Day</label>
            <input className={css.input} type="number" max="1" id="daygo" name="daygo"
                  required value={dayGo}
                  onChange={(e) => {setDayGo(e.target.value); setSave(true)}} />
          </div>

          <div className={css.row}>
            <h3>Octopus Flexible</h3>
            <p>&nbsp; for comparison</p>
          </div>

          <div className={css.row}>
            <label className={css.label} htmlFor="file">Tariff</label>
            <input className={css.input} type="text" id="flprice" name="flprice"
                    required value={flexPrice}
                    onChange={(e) => {setFlexPreis(e.target.value); setSave(true)}} />
            <label className={css.label} htmlFor="opprice">£ per Day</label>
            <input className={css.input} type="number" max="1" id="dayflex" name="dayflex"
                  required value={dayFlex}
                  onChange={(e) => {setDayFlex(e.target.value); setSave(true)}} />
          </div>

          <div className={css.row}>
            <h3>Period</h3>
            <p>&nbsp; Day, Month (day=00) or Year (month=00)</p>
          </div>

          <div className={css.row}>
            <label className={css.label} htmlFor="year">Year</label>
            <input className={css.input} type="number" min="2000" max="2999" id="year" name="year"
                    required value={year}
                    onChange={(e) => {setYear(e.target.value); setSave(true)}} />
          </div>

          <div className={css.row}>
            <label className={css.label} htmlFor="month">Month</label>
            <input className={css.input} type="number" min="00" max="12" id="month" name="month"
                    required value={month}
                    onChange={(e) => {setMonth(e.target.value); setSave(true)}} />
            <label className={css.label} htmlFor="day">Day</label>
            <input className={css.input} type="number" min="00" max="31" id="day" name="day"
                    required value={day}
                    onChange={(e) => {setDay(e.target.value); setSave(true)}} />
          </div>

          {errorMessage 
            ? <div className={css.error}>
                {errorMessage}
                &nbsp;&nbsp;
                <button onClick={errorOff}>OK</button>
              </div>
            : <div><br /><br /></div>
          }
          <div><br /><br /><br /></div>

          <div className={css.row}>
            {save ? <button className={css.button} onClick={handleSave}>Save Tariff</button>
                  : <Link className={css.button} href="/result">Show Result</Link>
            } 
          </div>
        </div>
      </div>
    </div>
  )
}
export default Octopus

export const getStaticProps: GetStaticProps<GoTariff> = async (context) => {
  const tariff = await getTariff()
  return { props: tariff }
}
