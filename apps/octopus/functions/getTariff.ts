import { apiUrl } from "./urls";
import { GoTariff } from "@zbit/octopus/shared";

export const getTariff = async(): GoTariff => {
  let tariff: GoTariff
  await fetch(apiUrl() + '/getTariff', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res.json())
    .then((data) => tariff = data)
  ;
  return tariff
}