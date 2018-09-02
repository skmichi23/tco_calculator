const DISCOUNT_RATE = 0.02;
const RESIDUAL = {
  "60000": [0.55, 0.62],
  "65000": [0.53, 0.6],
  "70000": [0.51, 0.59],
  "75000": [0.49, 0.57],
  "80000": [0.47, 0.55],
  "85000": [0.44, 0.53],
  "90000": [0.42, 0.52],
  "95000": [0.4, 0.5],
  "100000": [0.38, 0.48],
  "105000": [0.37, 0.47],
  "110000": [0.37, 0.47],
  "115000": [0.36, 0.46],
  "120000": [0.35, 0.45],
  "125000": [0.35, 0.45],
  "130000": [0.34, 0.44],
  "135000": [0.33, 0.43],
  "140000": [0.33, 0.43],
  "145000": [0.32, 0.42],
  "150000": [0.32, 0.42],
  "155000": [0.31, 0.41],
  "160000": [0.3, 0.4],
  "165000": [0.3, 0.4],
  "170000": [0.29, 0.39],
  "175000": [0.28, 0.38],
  "180000": [0.28, 0.38],
  "185000": [0.27, 0.37],
  "190000": [0.26, 0.36],
  "195000": [0.26, 0.36],
  "200000": [0.25, 0.35],
  "205000": [0.25, 0.35],
  "210000": [0.24, 0.34],
  "215000": [0.24, 0.34],
  "220000": [0.24, 0.34],
  "225000": [0.23, 0.33],
  "230000": [0.23, 0.33],
  "235000": [0.22, 0.32],
  "240000": [0.22, 0.32],
  "245000": [0.22, 0.32],
  "250000": [0.21, 0.31],
  "255000": [0.21, 0.31],
  "260000": [0.21, 0.31],
  "265000": [0.2, 0.3],
  "270000": [0.2, 0.3],
  "275000": [0.19, 0.29],
  "280000": [0.19, 0.29],
  "285000": [0.19, 0.29],
  "290000": [0.18, 0.28],
  "295000": [0.18, 0.28],
  "300000": [0.18, 0.28],
  "305000": [0.17, 0.27],
  "310000": [0.17, 0.27],
  "315000": [0.16, 0.26],
  "320000": [0.16, 0.26],
  "325000": [0.16, 0.26],
  "330000": [0.15, 0.25],
  "335000": [0.15, 0.25],
  "340000": [0.15, 0.25],
  "345000": [0.14, 0.24],
  "350000": [0.14, 0.24],
  "355000": [0.13, 0.23],
  "360000": [0.13, 0.23],
  "365000": [0.13, 0.23],
  "370000": [0.12, 0.22],
  "375000": [0.12, 0.22],
  "380000": [0.12, 0.22],
  "385000": [0.11, 0.21],
  "390000": [0.11, 0.21],
  "395000": [0.1, 0.2],
  "400000": [0.1, 0.2],
  "405000": [0.1, 0.2],
  "410000": [0.1, 0.2],
  "415000": [0.1, 0.19],
  "420000": [0.09, 0.19],
  "425000": [0.09, 0.19],
  "430000": [0.09, 0.19],
  "435000": [0.09, 0.18],
  "440000": [0.09, 0.18],
  "445000": [0.09, 0.18],
  "450000": [0.09, 0.18],
  "455000": [0.08, 0.17],
  "460000": [0.08, 0.17],
  "465000": [0.08, 0.17],
  "470000": [0.08, 0.17],
  "475000": [0.08, 0.16],
  "480000": [0.08, 0.16],
  "485000": [0.07, 0.16],
  "490000": [0.07, 0.16],
  "495000": [0.07, 0.15],
  "500000": [0.07, 0.15]
};

const SVC_COST_RATIO = 1.3;
const SVC_COST_EV = {
  "1": 140,
  "2": 439,
  "3": 832,
  "4": 1229,
  "5": 1776,
  "6": 2100,
  "7": 2700,
  "8": 3400,
  "9": 4200,
  "10": 5000
};

const DIFF_ADJUSTED = {
  "1": 192,
  "2": 801,
  "3": 965,
  "4": 965,
  "5": 1406,
  "6": 1600,
  "7": 1900,
  "8": 2300,
  "9": 2800,
  "10": 3400
};

const CONVENTIONAL = 0;
const ELECTRIC = 1;
const EV_PRICE = 36900;
const DIESEL_PRICE = 1.25;
const PETROL_PRICE = 1.38;
const EV_CONSUMPTION = 20;
const BASE_I_CONSTANT = 24000;
const BASE_II_CONSTANT = 32000;

const INTEREST_RATE = 0.04;
const MONTHS = 12;

/***
 * calc methods
 */

function calcDepreciation(price, years, kmYear, type) {
  const totalKm = years * kmYear;
  let residualVal = RESIDUAL[totalKm][type];

  return roundTo(
    (1 - residualVal * calcDiscountRateInMaturity(years)) * price,
    0
  );
}

function calcDiscountRateInMaturity(years) {
  return roundTo(1 / Math.pow(1 + DISCOUNT_RATE, years), 4);
}

function roundTo(number, decimalCount) {
  const multiplier = Math.pow(10, decimalCount);
  return Math.round(number * multiplier) / multiplier;
}

function calcCostOfFinance(period, price, mileage, type) {
  const residual = RESIDUAL[period * mileage][type] * price;
  const pmt = PMT(INTEREST_RATE / MONTHS, period * MONTHS, price, -residual);
  return roundTo(
    period * MONTHS * pmt * -1 - calcDepreciation(price, period, mileage, type),
    0
  );
}

function calcFuelCost(fuelPrice, consumption, totalKm) {
  return roundTo(((consumption * fuelPrice) / 100) * totalKm, 0);
}

function getFuelPrice(type) {
  switch (type) {
    case "petrol":
      return PETROL_PRICE;
    case "diesel":
      return DIESEL_PRICE;
    default:
      return -1;
  }
}

function calcTotalServiceCost(period, price, mileage) {
  const svcCost = calcServiceCostPartial(period, price, mileage);
  return roundTo(svcCost * countBaseServiceCost(mileage) * SVC_COST_RATIO, 0);
}

function calcTotalEvServiceCost(period, price, mileage) {
  return roundTo(
    SVC_COST_EV[period] * countBaseServiceCost(mileage) * SVC_COST_RATIO,
    0
  );
}

function calcServiceCostPartial(period, price, mileage) {
  let serviceCost = countDiffPriceAdjusted(period, price, mileage);
  if (period > 1) {
    serviceCost += calcServiceCostPartial(period - 1, price, mileage);
  }
  return serviceCost;
}

function countBaseI(price) {
  const baseI = roundTo(price / BASE_I_CONSTANT, 4);
  return baseI;
}

function countBaseII(mileage) {
  const baseII = roundTo(mileage / BASE_II_CONSTANT, 4);
  return baseII;
}

function countDiffPriceAdjusted(period, price, mileage) {
  const baseI = countBaseI(price);
  const baseII = countBaseII(mileage);
  const diffPriceAdjusted =
    baseI * DIFF_ADJUSTED[period] +
    ((1 - baseI) / 2) * DIFF_ADJUSTED[period] * baseII;
  return roundTo(diffPriceAdjusted, 4);
}

function calcInsuranceCost(yearly, years) {
  return yearly * years;
}

function calcEvInsuranceCost(convInsuranceCost, convPrice, evPrice) {
  return roundTo((evPrice / convPrice) * convInsuranceCost, 0);
}

function countBaseServiceCost(mileage) {
  return (
    ((mileage - BASE_II_CONSTANT) / 2.5 + BASE_II_CONSTANT) / BASE_II_CONSTANT
  );
}

function PMT(ir, np, pv, fv) {
  if (!fv) fv = 0;
  var pvif = Math.pow(1 + ir, np);
  var pmt = (ir / (pvif - 1)) * -(pv * pvif + fv);

  return roundTo(pmt, 2);
}

/***
 * calculations
 */

export default ({
  car,
  price,
  mileage,
  period,
  fuel,
  consumption,
  insurance,
  subsidy,
  electricity
}) => {
  const convDepreciation = calcDepreciation(
    price,
    period,
    mileage,
    CONVENTIONAL
  );
  const evDepreciation = calcDepreciation(EV_PRICE, period, mileage, ELECTRIC);
  const convCostOfFinance = calcCostOfFinance(
    period,
    price,
    mileage,
    CONVENTIONAL
  );
  const evCostOfFinance = calcCostOfFinance(
    period,
    EV_PRICE,
    mileage,
    ELECTRIC
  );
  const convFuelCost = calcFuelCost(
    getFuelPrice(fuel),
    consumption,
    period * mileage
  );
  const evFuelCost = calcFuelCost(
    electricity,
    EV_CONSUMPTION,
    period * mileage
  );
  const convTotalSvcCost = calcTotalServiceCost(period, price, mileage);
  const evTotalSvcCost = calcTotalEvServiceCost(period, price, mileage);
  const convInsuranceCost = calcInsuranceCost(insurance, period);
  const evInsuranceCost = calcEvInsuranceCost(
    convInsuranceCost,
    price,
    EV_PRICE
  );
  const convTotal =
    convDepreciation +
    convCostOfFinance +
    convFuelCost +
    convTotalSvcCost +
    convInsuranceCost;
  const evTotal =
    evDepreciation +
    evCostOfFinance +
    evFuelCost +
    evTotalSvcCost +
    evInsuranceCost -
    subsidy;
  const convPerKm = roundTo(convTotal / (mileage * period), 2);
  const evPerKm = roundTo(evTotal / (mileage * period), 2);
  const savings = roundTo(1 - 1 / (convPerKm / evPerKm), 2) * 100;
  const trees = ((mileage * period * 250) / 1000000) * 6;

  const evTotalWithSubsidy = evTotal + subsidy + subsidy;
  const convDepreciationPct = Math.round((convDepreciation / convTotal) * 100);
  const evDepreciationPct = Math.round(
    (evDepreciation / evTotalWithSubsidy) * 100
  );
  const convSubsidyPct = 0;
  const evSubsidyPct = Math.round((subsidy / evTotalWithSubsidy) * 100);
  const convFinancePct = Math.round((convCostOfFinance / convTotal) * 100);
  const evFinancePct = Math.round((evCostOfFinance / evTotalWithSubsidy) * 100);
  const convFuelPct = Math.round((convFuelCost / convTotal) * 100);
  const evFuelPct = Math.round((evFuelCost / evTotalWithSubsidy) * 100);
  const convServicePct = Math.round((convTotalSvcCost / convTotal) * 100);
  const evServicePct = Math.round((evTotalSvcCost / evTotalWithSubsidy) * 100);
  const convInsurancePct =
    100 -
    convDepreciationPct -
    convSubsidyPct -
    convFinancePct -
    convFuelPct -
    convServicePct;
  const evInsurancePct =
    100 -
    evDepreciationPct -
    evSubsidyPct -
    evFinancePct -
    evFuelPct -
    evServicePct;

  return {
    operationPeriod: period,
    totalKm: period * mileage,
    savings: savings,
    treesSaved: trees,
    comparison: {
      depreciation: [convDepreciation, evDepreciation],
      subsidy: [0, -subsidy],
      finance: [convCostOfFinance, evCostOfFinance],
      fuel: [convFuelCost, evFuelCost],
      service: [convTotalSvcCost, evTotalSvcCost],
      insurance: [convInsuranceCost, evInsuranceCost],
      total: [convTotal, evTotal],
      perkm: [convPerKm, evPerKm]
    },
    comparisonPct: {
      depreciation: [convDepreciationPct, evDepreciationPct],
      subsidy: [convSubsidyPct, evSubsidyPct],
      finance: [convFinancePct, evFinancePct],
      fuel: [convFuelPct, evFuelPct],
      service: [convServicePct, evServicePct],
      insurance: [convInsurancePct, evInsurancePct]
    }
  };
};
