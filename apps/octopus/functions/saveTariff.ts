import { apiUrl } from './urls'
import { GoTariff, SaveResult } from '@zbit/octopus/shared'

export const saveTariff = async (tariff: GoTariff) => {
  let response: SaveResult
  await fetch (apiUrl() + '/saveTariff', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(tariff)
  })
    .then(res => res.json())
    .then(data => response = data)
    .catch((error) => response = { error: true, message: error}) 
  ; 
  return response
}