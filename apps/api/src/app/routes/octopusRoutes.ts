import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { GoData, GoDataAndPrice, GoTariff } from '@zbit/octopus/shared';
import {
  getDay,
  getMonth,
  getYear,
  lastDay,
  currYear,
} from '../octopus-functions';

export const octopusRoutes = Router();

// to be assigned in /getTariff
// to be reassigned in /saveTariff
// every API call starts with /getTariff

octopusRoutes.use(bodyParser.json());

octopusRoutes.get('/', (req, res) => {
  res.send({ route: 'octopusRoute, no request' });
});

const tariffFile = path.join(
  process.cwd(),
  'apps',
  'api',
  'src',
  'assets',
  'data',
  'goTariff.json'
);

const getTariff = () => {
  const data = fs.readFileSync(tariffFile, 'utf8');
  const tariff = JSON.parse(data);
  return tariff;
};

octopusRoutes.get('/getTariff', (req, res) => {
  const tariff = getTariff();
  res.send(JSON.stringify(tariff));
});

octopusRoutes.post('/saveTariff', (req, res) => {
  const tariff = JSON.stringify(req.body);
  try {
    fs.writeFileSync(tariffFile, tariff, 'utf8');
  } catch (error) {
    res.status(400).send({ error: true, message: error })
  }
  res.status(201).send({ error: false, message: 'Tariff saved' });
});

octopusRoutes.get('/getData', async (req, res) => {
  const data = await getData();
  res.send(data);
});

const getData = async () => {
  const goTariff: GoTariff = getTariff();

  let goData: GoData = {
    error: false,
    message: '',
    date: '',
    kwhLow: 0,
    kwhHigh: 0,
    kwhTotal: 0,
    days: 0,
  };

  const { year } = goTariff;
  let { month, day } = goTariff;

  // month=00 => day=00
  if (month === '00' && day > '00') {
    goData.error = true;
    goData.message = 'If month is "00" then Day has to be "00" also.';
    goData.date = 'Error Date';
  }

  // plausible year: 20xx, but not ahead of time
  const nYear = Number(year);
  if (nYear < 2022 || nYear > currYear()) {
    goData.error = true;
    goData.message = 'Year should be 20xx, but not ahead of time.';
    goData.date = 'Error Year ' + year;
    return goData;
  }

  // plausible month: 00 for whole year or between 01 and 12
  if (month.length === 1) month = '0' + month;
  if (Number(month) > 12) {
    goData.error = true;
    goData.message = 'Month should be 00 for whole year or between 01 and 12.';
    goData.date = 'Error Month ' + month;
    return goData;
  }

  // plausible day: 00 or 01-lastDay
  if (day.length === 1) day = '0' + day;
  if (!(month === '00')) {
    if (Number(day) > lastDay(year, month)) {
      (goData.error = true),
        (goData.message = ''),
        (goData.date = 'Error Day ' + day);
      return goData;
    }
  }

  // Go tariff started 21/10/2022
  if (year == '2022') {
    if (month > '00' && month < '10') {
      goData.error = true;
      goData.message = 'Octopus Go Tariff only started at 21/10/2022.';
      goData.date = 'Error Month < 10';
      return goData;
    }
  }

  if (year == '2022' && month == '10') {
    if (day > '00' && day < '21') {
      goData.error = true;
      goData.message = 'Octopus Go Tariff only started at 21/10/2022.';
      goData.date = 'Error Day < 21';
      return goData;
    }
  }

  if (day === '00') {
    if (month === '00') {
      goData = await getYear(year, goTariff);
    } else {
      goData = await getMonth(year, month, goTariff);
    }
  } else {
    goData = await getDay(year, month, day, goTariff);
  }

  const { error, message, date, kwhLow, kwhHigh, kwhTotal, days } = goData;
  const { lowPrice, highPrice, flexPrice, dayGo, dayFlex } = goTariff;

  const useLow = kwhLow.toString();
  const useHigh = kwhHigh.toString();
  const useTotal = kwhTotal.toString();

  const inPound = Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
  });

  const pl = kwhLow * Number(lowPrice);
  const priceLow = inPound.format(pl);
  const ph = kwhHigh * Number(highPrice);
  const priceHigh = inPound.format(ph);
  const pdg = days * Number(dayGo);
  const priceDayGo = inPound.format(pdg);
  const pg = pl + ph + pdg;
  const priceGo = inPound.format(pg);
  const ppf = (kwhLow + kwhHigh) * Number(flexPrice);
  const pricePowerFlex = inPound.format(ppf);
  const pdf = days * Number(dayFlex);
  const priceDayFlex = inPound.format(pdf);
  const pf = ppf + pdf;
  const priceFlex = inPound.format(pf);
  const saved = pf - pg;
  const savedByGo = inPound.format(saved);

  const goPrice: GoDataAndPrice = {
    error,
    message,
    date,
    useLow,
    useHigh,
    useTotal,
    priceLow,
    priceHigh,
    priceGo,
    priceFlex,
    savedByGo,
    days: days.toString(),
    pricePowerFlex,
    priceDayFlex,
    priceDayGo,
  };

  return goPrice;
};
