import fetch from 'node-fetch'
import { GoData, GoTariff, OctopusResponse, OctopusResult } from '@zbit/octopus/shared'

export const getDay = async (jahr: string, mon: string, tag: string, goTariff: GoTariff): Promise<GoData> => {
  const link = 'https://sk_live_qREL4HZOG5zkfZ0aBUBrJXaL:@api.octopus.energy/v1/electricity-meter-points/1012970871627/meters/13K0140729/consumption/'
  const size = '1500' // max 1 day = 48 * 31 = 1488

  // 2022-10-24T00:00Z starts at 2022-10-24T01:00+01:00, effective 01:00
  // 2022-10-24T00:00  starts at 2022-10-24T00:00+01:00, effective 00:00
  // => skip the Z

  const from = `${jahr}-${mon}-${tag}T00:00`
  const to =   `${jahr}-${mon}-${tag}T23:59`

  const query = `?page_size=${size}&period_from=${from}&period_to=${to}&order_by=period`

  const url = `${link}/${query}`
  const response = await fetch(url)
  const data: OctopusResponse = await response.json()
  const dayData: OctopusResult[] = data.results
  let kwhLow = 0
  let kwhHigh = 0
  dayData.map(t => {
    const start = t.interval_start.slice(11,17)
    if (start >= goTariff.lowStart && start < goTariff.lowEnd) {
      kwhLow += t.consumption
    } else {
      kwhHigh += t.consumption
    }
  })
  const { year, month, day } = goTariff
  kwhLow = Math.round(kwhLow * 1000) / 1000
  kwhHigh = Math.round(kwhHigh * 1000) / 1000
  const kwhTotal = Math.round((kwhLow + kwhHigh) * 1000) / 1000
  return {
    error: false,
    message: '',
    date: `${day}/${month}/${year}`,
    kwhLow, kwhHigh, kwhTotal,
    days: 1
  }
}
