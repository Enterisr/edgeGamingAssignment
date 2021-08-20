import { Skills, MeasurementTypes } from "./MeasurementTypes";

export function GetMeasurementsGrades(measurements) {
  const accGrades = {};
  const avgGrades = {};
  measurements.forEach((measure) => {
    const type = MeasurementTypes[measure.type];
    const measureOBJ = Object.create(type);
    if (accGrades[measure.type])
      accGrades[measure.type].push(measureOBJ.getGrade(measure));
    else {
      accGrades[measure.type] = [measureOBJ.getGrade(measure)];
    }
  });
  Object.entries(accGrades).forEach(([type, measureAccArray]) => {
    const sumMeasure = measureAccArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    if (sumMeasure !== 0) avgGrades[type] = sumMeasure / measureAccArray.length;
    else avgGrades[type] = 0;
  });
  return avgGrades;
}
export function GetTimelineSkillGrades(avgGrades, skill) {
  const skillGrades = Object.entries(avgGrades).filter(([type, avgGrade]) => {
    return MeasurementTypes[type].skill === skill;
  });
  console.log(skillGrades);
}
export function GetSkillsGrades(avgGrades) {
  /*
    Do this if you want strict one truth policy
  const skills = new Set();
  Object.keys(avgGrades).forEach((measureType) =>
    skills.add(MeasurementTypes[measureType].skill)
  );*/
  const skillsMapping = new Map();
  Skills.forEach((skill) => {
    let skillAcc = 0;
    Object.entries(avgGrades).forEach(([type, avgGrade]) => {
      if (MeasurementTypes[type].skill === skill) {
        const avgWithWeight = avgGrade * MeasurementTypes[type].weight;
        skillAcc += avgWithWeight;
      }
    });
    skillsMapping.set(skill, skillAcc);
  });
  return skillsMapping;
}
