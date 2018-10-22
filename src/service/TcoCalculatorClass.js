import { observable, action, decorate } from "mobx";
import { observer } from "mobx-react";
import _ from "lodash";

class TcoCalculator {
  constructor() {
    fetch(process.env.REACT_APP_DATA_URL + "/cars.json")
      .then(response => response.json())
      .then(data => this.setCars(data.cars));

    fetch(process.env.REACT_APP_DATA_URL + "/residual.json")
      .then(response => response.json())
      .then(data => (this.RESIDUAL = data.residual));
  }

  answers = {};

  setAnswer(updatedState) {
    let updatedAnswers = _.merge(this.answers, updatedState);
    this.setAnswers(updatedAnswers);
  }

  initAnswers() {
    let answers = {};
    for (let question of this.questions) {
      answers[question.id] = question.defaultValue || "";
    }
    this.setAnswers(answers);
  }

  setAnswers(answers) {
    this.answers = answers;
  }

  cars = [];

  setCars(cars) {
    this.cars = cars;
    this.initQuestions(this.cars);
  }

  getCarById(id) {
    return this.cars.filter(car => car.id === id)[0];
  }

  questions = [];

  initQuestions(cars) {
    this.questions = [
      {
        id: "car",
        text: "What is the car you are using?",
        type: "selectWithImg",
        config: {
          options: this.cars.map(car => ({ title: car.name, value: car.id }))
        },
        onAnswer: value => ({
          car: this.getCarById(value).id,
          price: parseInt(this.getCarById(value).price, 10),
          insurance: Math.round(this.getCarById(value).price * 0.035)
        }),
        defaultValue: "citroen_jumper"
      },
      {
        id: "price",
        text: "What was the final purchase price?",
        type: "slider",
        config: {
          min: 10000,
          max: 30000,
          step: 100,
          unit: "€"
        },
        defaultValue: 16200,
        onAnswer: value => ({
          price: value,
          insurance: Math.round(value * 0.035)
        })
      },
      {
        id: "mileage",
        text: "What is your yearly mileage?",
        type: "slider",
        config: {
          min: 15000,
          max: 80000,
          step: 5000,
          unit: "km"
        },
        defaultValue: 20000
      },
      {
        id: "period",
        text: "What is your car operation period?",
        type: "slider",
        config: {
          min: 4,
          max: 10,
          step: 1,
          unit: "years"
        },
        defaultValue: 5
      },
      {
        id: "fuel",
        text: "What fuel are you driving?",
        type: "select",
        config: {
          options: [
            { title: "Diesel", value: "diesel", number: "A." },
            { title: "Petrol", value: "petrol", number: "B." }
          ]
        },
        defaultValue: "diesel"
      },
      {
        id: "consumption",
        text: "Average fuel consumption",
        type: "slider",
        config: {
          min: 8,
          max: 20,
          step: 0.1,
          unit: "l/100km"
        },
        onAnswer: value => ({
          consumption: Math.round(value * 100) / 100
        }),
        defaultValue: 11.0
      },
      {
        id: "insurance",
        text: "Yearly insurance costs",
        type: "slider",
        config: {
          min: 0,
          max: 1500,
          step: 100,
          unit: "€"
        },
        defaultValue: 742
      },
      {
        id: "subsidy",
        text: "Government subsidy?",
        type: "slider",
        config: {
          min: 0,
          max: 15000,
          step: 100,
          unit: "€"
        },
        defaultValue: 6000
      },
      {
        id: "electricity",
        text: "Price for 1kWh of electricity",
        type: "slider",
        config: {
          min: 0,
          max: 0.6,
          step: 0.01,
          unit: "€"
        },
        defaultValue: 0.12
      }
    ];

    this.initAnswers();
  }

  setResidual(residual) {
    this.RESIDUAL = residual;
  }

  DISCOUNT_RATE = 0.02;
  RESIDUAL = {};

  SVC_COST_RATIO = 1.3;
  SVC_COST_EV = {
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

  DIFF_ADJUSTED = {
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

  CONVENTIONAL = 0;
  ELECTRIC = 1;
  EV_PRICE = 36900;
  DIESEL_PRICE = 1.25;
  PETROL_PRICE = 1.38;
  EV_CONSUMPTION = 20;
  BASE_I_CONSTANT = 24000;
  BASE_II_CONSTANT = 32000;

  INTEREST_RATE = 0.04;
  MONTHS = 12;

  /***
   * calc methods
   */

  getResidualValue(totalKm) {
    if (this.RESIDUAL[totalKm]) {
      return this.RESIDUAL[totalKm];
    } else {
      if (totalKm < 60000) {
        console.log(
          "No residual value for " + totalKm + ", returning lowest value"
        );
        return this.RESIDUAL["60000"];
      } else {
        console.log(
          "No residual value for " + totalKm + ", returning highest value"
        );
        return this.RESIDUAL["500000"];
      }
    }
  }

  calcDepreciation(price, years, kmYear, type) {
    const totalKm = years * kmYear;
    let residualVal = this.getResidualValue(totalKm)[type];

    return this.roundTo(
      (1 - residualVal * this.calcDiscountRateInMaturity(years)) * price,
      0
    );
  }

  calcDiscountRateInMaturity(years) {
    return this.roundTo(1 / Math.pow(1 + this.DISCOUNT_RATE, years), 4);
  }

  roundTo(number, decimalCount) {
    const multiplier = Math.pow(10, decimalCount);
    return Math.round(number * multiplier) / multiplier;
  }

  calcCostOfFinance(period, price, mileage, type) {
    const totalKm = period * mileage;

    const residual = this.getResidualValue(totalKm)[type] * price;
    const pmt = this.PMT(
      this.INTEREST_RATE / this.MONTHS,
      period * this.MONTHS,
      price,
      -residual
    );
    return this.roundTo(
      period * this.MONTHS * pmt * -1 -
        this.calcDepreciation(price, period, mileage, type),
      0
    );
  }

  calcFuelCost(fuelPrice, consumption, totalKm) {
    return this.roundTo(((consumption * fuelPrice) / 100) * totalKm, 0);
  }

  getFuelPrice(type) {
    switch (type) {
      case "petrol":
        return this.PETROL_PRICE;
      case "diesel":
        return this.DIESEL_PRICE;
      default:
        return -1;
    }
  }

  calcTotalServiceCost(period, price, mileage) {
    const svcCost = this.calcServiceCostPartial(period, price, mileage);
    return this.roundTo(
      svcCost * this.countBaseServiceCost(mileage) * this.SVC_COST_RATIO,
      0
    );
  }

  calcTotalEvServiceCost(period, price, mileage) {
    return this.roundTo(
      this.SVC_COST_EV[period] *
        this.countBaseServiceCost(mileage) *
        this.SVC_COST_RATIO,
      0
    );
  }

  calcServiceCostPartial(period, price, mileage) {
    let serviceCost = this.countDiffPriceAdjusted(period, price, mileage);
    if (period > 1) {
      serviceCost += this.calcServiceCostPartial(period - 1, price, mileage);
    }
    return serviceCost;
  }

  countBaseI(price) {
    const baseI = this.roundTo(price / this.BASE_I_CONSTANT, 4);
    return baseI;
  }

  countBaseII(mileage) {
    const baseII = this.roundTo(mileage / this.BASE_II_CONSTANT, 4);
    return baseII;
  }

  countDiffPriceAdjusted(period, price, mileage) {
    const baseI = this.countBaseI(price);
    const baseII = this.countBaseII(mileage);
    const diffPriceAdjusted =
      baseI * this.DIFF_ADJUSTED[period] +
      ((1 - baseI) / 2) * this.DIFF_ADJUSTED[period] * baseII;
    return this.roundTo(diffPriceAdjusted, 4);
  }

  calcInsuranceCost(yearly, years) {
    return yearly * years;
  }

  calcEvInsuranceCost(convInsuranceCost, convPrice, evPrice) {
    return this.roundTo((evPrice / convPrice) * convInsuranceCost, 0);
  }

  countBaseServiceCost(mileage) {
    return (
      ((mileage - this.BASE_II_CONSTANT) / 2.5 + this.BASE_II_CONSTANT) /
      this.BASE_II_CONSTANT
    );
  }

  PMT(ir, np, pv, fv) {
    if (!fv) fv = 0;
    var pvif = Math.pow(1 + ir, np);
    var pmt = (ir / (pvif - 1)) * -(pv * pvif + fv);

    return this.roundTo(pmt, 2);
  }

  /***
   * calculations
   */

  calculateTco({
    car,
    carName,
    price,
    mileage,
    period,
    fuel,
    consumption,
    insurance,
    subsidy,
    electricity
  }) {
    const convDepreciation = this.calcDepreciation(
      price,
      period,
      mileage,
      this.CONVENTIONAL
    );
    const evDepreciation = this.calcDepreciation(
      this.EV_PRICE,
      period,
      mileage,
      this.ELECTRIC
    );
    const convCostOfFinance = this.calcCostOfFinance(
      period,
      price,
      mileage,
      this.CONVENTIONAL
    );
    const evCostOfFinance = this.calcCostOfFinance(
      period,
      this.EV_PRICE,
      mileage,
      this.ELECTRIC
    );
    const convFuelCost = this.calcFuelCost(
      this.getFuelPrice(fuel),
      consumption,
      period * mileage
    );
    const evFuelCost = this.calcFuelCost(
      electricity,
      this.EV_CONSUMPTION,
      period * mileage
    );
    const convTotalSvcCost = this.calcTotalServiceCost(period, price, mileage);
    const evTotalSvcCost = this.calcTotalEvServiceCost(period, price, mileage);
    const convInsuranceCost = this.calcInsuranceCost(insurance, period);
    const evInsuranceCost = this.calcEvInsuranceCost(
      convInsuranceCost,
      price,
      this.EV_PRICE
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
    const convPerKm = this.roundTo(convTotal / (mileage * period), 2);
    const evPerKm = this.roundTo(evTotal / (mileage * period), 2);
    const savings = Math.max(
      0,
      this.roundTo(1 - 1 / (convPerKm / evPerKm), 2) * 100
    );
    const totalSavings = Math.max(0, convTotal - evTotal);
    const trees = ((mileage * period * 250) / 1000000) * 6;

    const evTotalWithSubsidy = evTotal + subsidy * 2;
    const convDepreciationPct = Math.round(
      (convDepreciation / convTotal) * 100
    );
    const evDepreciationPct = Math.round(
      (evDepreciation / evTotalWithSubsidy) * 100
    );
    const convSubsidyPct = 0;
    const evSubsidyPct = Math.round((subsidy / evTotalWithSubsidy) * 100);
    const convFinancePct = Math.round((convCostOfFinance / convTotal) * 100);
    const evFinancePct = Math.round(
      (evCostOfFinance / evTotalWithSubsidy) * 100
    );
    const convFuelPct = Math.round((convFuelCost / convTotal) * 100);
    const evFuelPct = Math.round((evFuelCost / evTotalWithSubsidy) * 100);
    const convServicePct = Math.round((convTotalSvcCost / convTotal) * 100);
    const evServicePct = Math.round(
      (evTotalSvcCost / evTotalWithSubsidy) * 100
    );
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
      car: car,
      carName: this.getCarById(car).name,
      operationPeriod: period,
      totalKm: period * mileage,
      savings: savings,
      totalSavings: totalSavings,
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
  }
}

decorate(TcoCalculator, {
  cars: observable,
  setCars: action,
  initQuestions: observer,
  questions: observable,
  initQuestions: action,
  answers: observable,
  initAnswers: observable,
  setAnswers: action,
  setAnswer: action
});

export default new TcoCalculator();
