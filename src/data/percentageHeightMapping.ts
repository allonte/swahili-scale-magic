export interface PercentageHeight {
  percentage: number;
  height: number;
}

export const percentageHeightData = {
  tank1: [
    { percentage: 0, height: 0 },
    { percentage: 5, height: 154.45 },
    { percentage: 10, height: 308.9 },
    { percentage: 85, height: 2625.65 },
    { percentage: 90, height: 2780.1 },
    { percentage: 95, height: 2934.55 },
    { percentage: 100, height: 2954 },
  ],
  tank2: [
    { percentage: 0, height: 0 },
    { percentage: 5, height: 121.1 },
    { percentage: 10, height: 242.2 },
    { percentage: 85, height: 2058.7 },
    { percentage: 90, height: 2179.8 },
    { percentage: 95, height: 2300.9 },
    { percentage: 100, height: 2960 },
  ],
} as const;

type TankId = keyof typeof percentageHeightData;

export const getHeightFromPercentage = (percentage: number, tank: TankId): number => {
  const data = percentageHeightData[tank];
  if (percentage <= data[0].percentage) return data[0].height;
  if (percentage >= data[data.length - 1].percentage) return data[data.length - 1].height;
  const index = data.findIndex((p) => p.percentage >= percentage);
  const lower = data[index - 1];
  const upper = data[index];
  const ratio =
    (percentage - lower.percentage) / (upper.percentage - lower.percentage);
  return lower.height + (upper.height - lower.height) * ratio;
};

export const getPercentageFromHeight = (height: number, tank: TankId): number => {
  const data = percentageHeightData[tank];
  if (height <= data[0].height) return data[0].percentage;
  if (height >= data[data.length - 1].height) return data[data.length - 1].percentage;
  const index = data.findIndex((p) => p.height >= height);
  const lower = data[index - 1];
  const upper = data[index];
  const ratio = (height - lower.height) / (upper.height - lower.height);
  return lower.percentage + (upper.percentage - lower.percentage) * ratio;
};
