import { apiUrl } from "./urls"
import { GoDataAndPrice } from "@zbit/octopus/shared"

export const getData = async (): GoDataAndPrice => {
  let goData: GoDataAndPrice
  const url = apiUrl() + '/getData'
  await fetch(url)
    .then(res => res.json())
    .then(data => goData = data)
  ;
  return goData
}
