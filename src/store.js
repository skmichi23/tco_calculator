export const cars = [
  { name: "Peugeot Boxer", price: 16200, id: "peugeot_boxer" },
  { name: "Renault Master", price: 15800, id: "renault_master" },
  { name: "Citroen Jumper", price: 16000, id: "citroen_jumper" },
  { name: "Mercedes Sprinter", price: 21200, id: "mercedes_sprinter" },
  { name: "Ford Transit", price: 18900, id: "ford_transit" },
  { name: "Fiat Ducato", price: 17200, id: "fiat_ducato" },
  { name: "Iveco Daily", price: 20400, id: "iveco_daily" },
  { name: "Opel Movano", price: 18100, id: "opel_movano" }
];

export const questions = [
  {
    id: "car",
    text: "What is the car you are using?",
    type: "selectWithImg",
    config: {
      options: cars.map(car => ({ title: car.name, value: car.id }))
    },
    onAnswer: value => ({
      car: getCarById(value).id,
      price: parseInt(getCarById(value).price, 10),
      insurance: Math.round(getCarById(value).price * 0.035)
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

export function getCarById(id) {
  return cars.filter(car => car.id === id)[0];
}
