export const Skills = { speed: "Speed", accuracy: "Accuracy" };

//exporting only this to have a single source of truth;
export const MeasurementTypes = {
  Move: {
    name: "Move",
    inputType: "number",
    skill: Skills.speed,
    hasMultipleEvents: true,
    weight: 0.5,
    getGrade: (measurement) => {
      if (measurement < 105) return 100;
      else if (measurement >= 105 && 250 < measurement) return 70;
      return 0;
    },
  },
  Bomb: {
    name: "Bomb",
    hasMultipleEvents: false,
    inputType: "bool",
    skill: Skills.speed,
    weight: 0.5,
    getGrade: (measurement) => {
      if (measurement < 40000) return 100;
      return 0;
    },
  },
  Misses: {
    name: "Misses",
    hasMultipleEvents: true,

    inputType: "number",
    weight: 0.2,
    skill: Skills.accuracy,
    getGrade: (measurementValue) => {
      if (measurementValue < 60) return 100;
      else if (measurementValue >= 60 && 400 < measurementValue) return 70;
      return 0;
    },
  },
  Headshot: {
    name: "Headshot",
    hasMultipleEvents: true,
    inputType: "bool",
    skill: Skills.accuracy,
    weight: 0.4,
    getGrade: (measurement) => {
      if (measurement) return 100;
      return 0;
    },
  },
  "Body hit": {
    name: "Body hit",
    inputType: "bool",
    hasMultipleEvents: true,
    skill: Skills.accuracy,
    weight: 0.4,
    getGrade: (measurement) => {
      if (measurement) return 80;
    },
  },
};
