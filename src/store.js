export const cars = [
  { name: "Peugeot Boxer", price: 16200 },
  { name: "Renault Master", price: 15800 },
  { name: "Citroen Jumper", price: 16000 },
  { name: "Mercedes Sprinter", price: 21200 },
  { name: "Ford Transit", price: 18900 },
  { name: "Fiat Ducato", price: 17200 },
  { name: "Iveco Daily", price: 20400 },
  { name: "Opel Movano", price: 18100 }
];

export const questions = [
  {
    id: "car",
    text: "What is the car you are using",
    type: "select",
    config: {
      options: cars.map(car => ({ title: car.name, value: car.name }))
    },
    onAnswer: value => ({
      car: getCarByName(value).name,
      price: parseInt(getCarByName(value).price),
      insurance: Math.round(getCarByName(value).price * 0.035)
    }),
    defaultValue: "Peugeot Boxer"
  },
  {
    id: "price",
    text: "What was the final purchase price?",
    type: "slider",
    config: {
      min: 10000,
      max: 30000,
      step: 1000,
      marks: { "1000": "1000", "2000": "2000", "3000": "3000" },
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
      min: 1,
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
        { title: "Diesel", value: "diesel" },
        { title: "Petrol", value: "petrol" }
      ]
    },
    defaultValue: "diesel"
  },
  {
    id: "consumption",
    text: "Average fuel consumption",
    type: "slider",
    config: {
      min: 4,
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
    type: "input",
    defaultValue: 7000
  },
  {
    id: "electricity",
    text: "Price for 1kWh of electricity",
    type: "input",
    defaultValue: 0.12
  }
];

function getCarByName(name) {
  return cars.filter(car => car.name === name)[0];
}
