// Volume correction factors table data extracted from calibration document
// Temperature ranges from 0°C to 28.5°C, Density ranges from 0.500 to 0.590 kg/L

interface CorrectionData {
  temperature: number;
  factors: { [density: string]: number };
}

const volumeCorrectionTable: CorrectionData[] = [
  // Temperature 0°C to 15°C
  { temperature: 0, factors: { "0.500": 1.070, "0.510": 1.065, "0.520": 1.060, "0.530": 1.059, "0.540": 1.056, "0.550": 1.051, "0.560": 1.050, "0.570": 1.047, "0.580": 1.046, "0.590": 1.042 } },
  { temperature: 0.5, factors: { "0.500": 1.068, "0.510": 1.063, "0.520": 1.059, "0.530": 1.058, "0.540": 1.054, "0.550": 1.050, "0.560": 1.049, "0.570": 1.045, "0.580": 1.045, "0.590": 1.041 } },
  { temperature: 1.0, factors: { "0.500": 1.066, "0.510": 1.061, "0.520": 1.057, "0.530": 1.056, "0.540": 1.053, "0.550": 1.048, "0.560": 1.048, "0.570": 1.044, "0.580": 1.044, "0.590": 1.040 } },
  { temperature: 1.5, factors: { "0.500": 1.064, "0.510": 1.060, "0.520": 1.056, "0.530": 1.055, "0.540": 1.051, "0.550": 1.047, "0.560": 1.046, "0.570": 1.043, "0.580": 1.042, "0.590": 1.039 } },
  { temperature: 2.0, factors: { "0.500": 1.062, "0.510": 1.058, "0.520": 1.054, "0.530": 1.053, "0.540": 1.050, "0.550": 1.046, "0.560": 1.045, "0.570": 1.042, "0.580": 1.041, "0.590": 1.038 } },
  { temperature: 2.5, factors: { "0.500": 1.060, "0.510": 1.056, "0.520": 1.052, "0.530": 1.052, "0.540": 1.048, "0.550": 1.044, "0.560": 1.044, "0.570": 1.041, "0.580": 1.040, "0.590": 1.037 } },
  { temperature: 3.0, factors: { "0.500": 1.059, "0.510": 1.055, "0.520": 1.051, "0.530": 1.050, "0.540": 1.047, "0.550": 1.043, "0.560": 1.043, "0.570": 1.039, "0.580": 1.039, "0.590": 1.036 } },
  { temperature: 3.5, factors: { "0.500": 1.057, "0.510": 1.053, "0.520": 1.049, "0.530": 1.048, "0.540": 1.045, "0.550": 1.042, "0.560": 1.041, "0.570": 1.038, "0.580": 1.038, "0.590": 1.034 } },
  { temperature: 4.0, factors: { "0.500": 1.055, "0.510": 1.051, "0.520": 1.048, "0.530": 1.047, "0.540": 1.044, "0.550": 1.040, "0.560": 1.040, "0.570": 1.037, "0.580": 1.036, "0.590": 1.033 } },
  { temperature: 4.5, factors: { "0.500": 1.053, "0.510": 1.050, "0.520": 1.046, "0.530": 1.045, "0.540": 1.043, "0.550": 1.039, "0.560": 1.039, "0.570": 1.036, "0.580": 1.035, "0.590": 1.032 } },
  { temperature: 5.0, factors: { "0.500": 1.051, "0.510": 1.048, "0.520": 1.045, "0.530": 1.044, "0.540": 1.041, "0.550": 1.038, "0.560": 1.037, "0.570": 1.035, "0.580": 1.034, "0.590": 1.031 } },
  { temperature: 5.5, factors: { "0.500": 1.049, "0.510": 1.046, "0.520": 1.043, "0.530": 1.042, "0.540": 1.040, "0.550": 1.037, "0.560": 1.036, "0.570": 1.033, "0.580": 1.033, "0.590": 1.030 } },
  { temperature: 6.0, factors: { "0.500": 1.048, "0.510": 1.045, "0.520": 1.041, "0.530": 1.041, "0.540": 1.038, "0.550": 1.035, "0.560": 1.035, "0.570": 1.032, "0.580": 1.032, "0.590": 1.029 } },
  { temperature: 6.5, factors: { "0.500": 1.046, "0.510": 1.043, "0.520": 1.040, "0.530": 1.039, "0.540": 1.037, "0.550": 1.034, "0.560": 1.033, "0.570": 1.031, "0.580": 1.031, "0.590": 1.028 } },
  { temperature: 7.0, factors: { "0.500": 1.044, "0.510": 1.041, "0.520": 1.038, "0.530": 1.038, "0.540": 1.035, "0.550": 1.033, "0.560": 1.032, "0.570": 1.030, "0.580": 1.029, "0.590": 1.027 } },
  { temperature: 7.5, factors: { "0.500": 1.042, "0.510": 1.040, "0.520": 1.037, "0.530": 1.036, "0.540": 1.034, "0.550": 1.031, "0.560": 1.031, "0.570": 1.029, "0.580": 1.028, "0.590": 1.026 } },
  { temperature: 8.0, factors: { "0.500": 1.041, "0.510": 1.038, "0.520": 1.035, "0.530": 1.035, "0.540": 1.033, "0.550": 1.030, "0.560": 1.030, "0.570": 1.027, "0.580": 1.027, "0.590": 1.025 } },
  { temperature: 8.5, factors: { "0.500": 1.039, "0.510": 1.036, "0.520": 1.034, "0.530": 1.033, "0.540": 1.031, "0.550": 1.029, "0.560": 1.028, "0.570": 1.026, "0.580": 1.026, "0.590": 1.024 } },
  { temperature: 9.0, factors: { "0.500": 1.037, "0.510": 1.035, "0.520": 1.032, "0.530": 1.032, "0.540": 1.030, "0.550": 1.027, "0.560": 1.027, "0.570": 1.025, "0.580": 1.025, "0.590": 1.023 } },
  { temperature: 9.5, factors: { "0.500": 1.035, "0.510": 1.033, "0.520": 1.031, "0.530": 1.030, "0.540": 1.028, "0.550": 1.026, "0.560": 1.026, "0.570": 1.024, "0.580": 1.024, "0.590": 1.022 } },
  { temperature: 10.0, factors: { "0.500": 1.034, "0.510": 1.031, "0.520": 1.029, "0.530": 1.029, "0.540": 1.027, "0.550": 1.025, "0.560": 1.025, "0.570": 1.023, "0.580": 1.022, "0.590": 1.021 } },
  { temperature: 10.5, factors: { "0.500": 1.032, "0.510": 1.030, "0.520": 1.028, "0.530": 1.027, "0.540": 1.026, "0.550": 1.024, "0.560": 1.023, "0.570": 1.022, "0.580": 1.021, "0.590": 1.020 } },
  { temperature: 11.0, factors: { "0.500": 1.030, "0.510": 1.028, "0.520": 1.026, "0.530": 1.026, "0.540": 1.024, "0.550": 1.022, "0.560": 1.022, "0.570": 1.020, "0.580": 1.020, "0.590": 1.019 } },
  { temperature: 11.5, factors: { "0.500": 1.028, "0.510": 1.027, "0.520": 1.025, "0.530": 1.024, "0.540": 1.023, "0.550": 1.021, "0.560": 1.021, "0.570": 1.019, "0.580": 1.019, "0.590": 1.017 } },
  { temperature: 12.0, factors: { "0.500": 1.027, "0.510": 1.025, "0.520": 1.023, "0.530": 1.023, "0.540": 1.022, "0.550": 1.020, "0.560": 1.020, "0.570": 1.018, "0.580": 1.018, "0.590": 1.016 } },
  { temperature: 12.5, factors: { "0.500": 1.025, "0.510": 1.023, "0.520": 1.022, "0.530": 1.021, "0.540": 1.020, "0.550": 1.019, "0.560": 1.018, "0.570": 1.017, "0.580": 1.017, "0.590": 1.015 } },
  { temperature: 13.0, factors: { "0.500": 1.023, "0.510": 1.022, "0.520": 1.020, "0.530": 1.020, "0.540": 1.019, "0.550": 1.017, "0.560": 1.017, "0.570": 1.016, "0.580": 1.016, "0.590": 1.014 } },
  { temperature: 13.5, factors: { "0.500": 1.022, "0.510": 1.020, "0.520": 1.019, "0.530": 1.019, "0.540": 1.017, "0.550": 1.016, "0.560": 1.016, "0.570": 1.015, "0.580": 1.015, "0.590": 1.013 } },
  { temperature: 14.0, factors: { "0.500": 1.020, "0.510": 1.019, "0.520": 1.017, "0.530": 1.017, "0.540": 1.016, "0.550": 1.015, "0.560": 1.015, "0.570": 1.014, "0.580": 1.013, "0.590": 1.012 } },
  { temperature: 14.5, factors: { "0.500": 1.018, "0.510": 1.017, "0.520": 1.016, "0.530": 1.016, "0.540": 1.015, "0.550": 1.014, "0.560": 1.013, "0.570": 1.012, "0.580": 1.012, "0.590": 1.011 } },
  { temperature: 15.0, factors: { "0.500": 1.017, "0.510": 1.015, "0.520": 1.014, "0.530": 1.014, "0.540": 1.013, "0.550": 1.012, "0.560": 1.012, "0.570": 1.011, "0.580": 1.011, "0.590": 1.010 } },
  
  // Temperature 15.5°C to 28.5°C
  { temperature: 15.5, factors: { "0.500": 1.015, "0.510": 1.014, "0.520": 1.013, "0.530": 1.013, "0.540": 1.012, "0.550": 1.011, "0.560": 1.011, "0.570": 1.010, "0.580": 1.010, "0.590": 1.009 } },
  { temperature: 16.0, factors: { "0.500": 1.013, "0.510": 1.012, "0.520": 1.012, "0.530": 1.011, "0.540": 1.011, "0.550": 1.010, "0.560": 1.010, "0.570": 1.009, "0.580": 1.009, "0.590": 1.008 } },
  { temperature: 16.5, factors: { "0.500": 1.012, "0.510": 1.011, "0.520": 1.010, "0.530": 1.010, "0.540": 1.009, "0.550": 1.009, "0.560": 1.008, "0.570": 1.008, "0.580": 1.008, "0.590": 1.007 } },
  { temperature: 17.0, factors: { "0.500": 1.010, "0.510": 1.009, "0.520": 1.009, "0.530": 1.008, "0.540": 1.008, "0.550": 1.007, "0.560": 1.007, "0.570": 1.007, "0.580": 1.007, "0.590": 1.006 } },
  { temperature: 17.5, factors: { "0.500": 1.008, "0.510": 1.008, "0.520": 1.007, "0.530": 1.007, "0.540": 1.007, "0.550": 1.006, "0.560": 1.006, "0.570": 1.006, "0.580": 1.006, "0.590": 1.005 } },
  { temperature: 18.0, factors: { "0.500": 1.007, "0.510": 1.006, "0.520": 1.006, "0.530": 1.006, "0.540": 1.005, "0.550": 1.005, "0.560": 1.005, "0.570": 1.004, "0.580": 1.004, "0.590": 1.004 } },
  { temperature: 18.5, factors: { "0.500": 1.005, "0.510": 1.005, "0.520": 1.004, "0.530": 1.004, "0.540": 1.004, "0.550": 1.004, "0.560": 1.004, "0.570": 1.003, "0.580": 1.003, "0.590": 1.003 } },
  { temperature: 19.0, factors: { "0.500": 1.003, "0.510": 1.003, "0.520": 1.003, "0.530": 1.003, "0.540": 1.003, "0.550": 1.002, "0.560": 1.002, "0.570": 1.002, "0.580": 1.002, "0.590": 1.002 } },
  { temperature: 19.5, factors: { "0.500": 1.002, "0.510": 1.002, "0.520": 1.001, "0.530": 1.001, "0.540": 1.001, "0.550": 1.001, "0.560": 1.001, "0.570": 1.001, "0.580": 1.001, "0.590": 1.001 } },
  { temperature: 20.0, factors: { "0.500": 1.000, "0.510": 1.000, "0.520": 1.000, "0.530": 1.000, "0.540": 1.000, "0.550": 1.000, "0.560": 1.000, "0.570": 1.000, "0.580": 1.000, "0.590": 1.000 } },
  { temperature: 20.5, factors: { "0.500": 0.998, "0.510": 0.998, "0.520": 0.999, "0.530": 0.999, "0.540": 0.999, "0.550": 0.999, "0.560": 0.999, "0.570": 0.999, "0.580": 0.999, "0.590": 0.999 } },
  { temperature: 21.0, factors: { "0.500": 0.997, "0.510": 0.997, "0.520": 0.997, "0.530": 0.997, "0.540": 0.997, "0.550": 0.998, "0.560": 0.998, "0.570": 0.998, "0.580": 0.998, "0.590": 0.998 } },
  { temperature: 21.5, factors: { "0.500": 0.995, "0.510": 0.995, "0.520": 0.996, "0.530": 0.996, "0.540": 0.996, "0.550": 0.996, "0.560": 0.996, "0.570": 0.997, "0.580": 0.997, "0.590": 0.997 } },
  { temperature: 22.0, factors: { "0.500": 0.994, "0.510": 0.994, "0.520": 0.994, "0.530": 0.994, "0.540": 0.995, "0.550": 0.995, "0.560": 0.995, "0.570": 0.996, "0.580": 0.996, "0.590": 0.996 } },
  { temperature: 22.5, factors: { "0.500": 0.992, "0.510": 0.992, "0.520": 0.993, "0.530": 0.993, "0.540": 0.993, "0.550": 0.994, "0.560": 0.994, "0.570": 0.994, "0.580": 0.995, "0.590": 0.995 } },
  { temperature: 23.0, factors: { "0.500": 0.990, "0.510": 0.991, "0.520": 0.992, "0.530": 0.992, "0.540": 0.992, "0.550": 0.993, "0.560": 0.993, "0.570": 0.993, "0.580": 0.993, "0.590": 0.994 } },
  { temperature: 23.5, factors: { "0.500": 0.989, "0.510": 0.989, "0.520": 0.990, "0.530": 0.990, "0.540": 0.991, "0.550": 0.992, "0.560": 0.992, "0.570": 0.992, "0.580": 0.992, "0.590": 0.993 } },
  { temperature: 24.0, factors: { "0.500": 0.987, "0.510": 0.988, "0.520": 0.989, "0.530": 0.989, "0.540": 0.990, "0.550": 0.990, "0.560": 0.990, "0.570": 0.991, "0.580": 0.991, "0.590": 0.992 } },
  { temperature: 24.5, factors: { "0.500": 0.986, "0.510": 0.986, "0.520": 0.987, "0.530": 0.988, "0.540": 0.988, "0.550": 0.989, "0.560": 0.989, "0.570": 0.990, "0.580": 0.990, "0.590": 0.991 } },
  { temperature: 25.0, factors: { "0.500": 0.984, "0.510": 0.985, "0.520": 0.986, "0.530": 0.986, "0.540": 0.987, "0.550": 0.988, "0.560": 0.988, "0.570": 0.989, "0.580": 0.989, "0.590": 0.990 } },
  { temperature: 25.5, factors: { "0.500": 0.982, "0.510": 0.984, "0.520": 0.985, "0.530": 0.985, "0.540": 0.986, "0.550": 0.987, "0.560": 0.987, "0.570": 0.988, "0.580": 0.988, "0.590": 0.989 } },
  { temperature: 26.0, factors: { "0.500": 0.981, "0.510": 0.982, "0.520": 0.983, "0.530": 0.983, "0.540": 0.984, "0.550": 0.986, "0.560": 0.986, "0.570": 0.987, "0.580": 0.987, "0.590": 0.988 } },
  { temperature: 26.5, factors: { "0.500": 0.979, "0.510": 0.981, "0.520": 0.982, "0.530": 0.982, "0.540": 0.983, "0.550": 0.984, "0.560": 0.985, "0.570": 0.986, "0.580": 0.986, "0.590": 0.987 } },
  { temperature: 27.0, factors: { "0.500": 0.978, "0.510": 0.979, "0.520": 0.980, "0.530": 0.981, "0.540": 0.982, "0.550": 0.983, "0.560": 0.983, "0.570": 0.985, "0.580": 0.985, "0.590": 0.986 } },
  { temperature: 27.5, factors: { "0.500": 0.976, "0.510": 0.978, "0.520": 0.979, "0.530": 0.979, "0.540": 0.981, "0.550": 0.982, "0.560": 0.982, "0.570": 0.984, "0.580": 0.984, "0.590": 0.985 } },
  { temperature: 28.0, factors: { "0.500": 0.975, "0.510": 0.976, "0.520": 0.978, "0.530": 0.978, "0.540": 0.979, "0.550": 0.981, "0.560": 0.981, "0.570": 0.982, "0.580": 0.983, "0.590": 0.984 } },
  { temperature: 28.5, factors: { "0.500": 0.973, "0.510": 0.975, "0.520": 0.976, "0.530": 0.977, "0.540": 0.978, "0.550": 0.980, "0.560": 0.980, "0.570": 0.981, "0.580": 0.982, "0.590": 0.983 } }
];

const densityRange = [0.500, 0.510, 0.520, 0.530, 0.540, 0.550, 0.560, 0.570, 0.580, 0.590];

/**
 * Get volume correction factor based on density and temperature
 * Uses bilinear interpolation for values between table points
 */
export function getVolumeCorrectionFactor(density: number, temperature: number): number {
  // Clamp values to table ranges
  const clampedDensity = Math.max(0.500, Math.min(0.590, density));
  const clampedTemperature = Math.max(0, Math.min(28.5, temperature));

  // Find surrounding temperature points
  let tempLower = 0;
  let tempUpper = 0;
  let tempIndex = -1;

  for (let i = 0; i < volumeCorrectionTable.length; i++) {
    if (volumeCorrectionTable[i].temperature >= clampedTemperature) {
      tempUpper = volumeCorrectionTable[i].temperature;
      tempIndex = i;
      if (i > 0) {
        tempLower = volumeCorrectionTable[i - 1].temperature;
      } else {
        tempLower = tempUpper;
      }
      break;
    }
  }

  // If temperature is beyond table range, use last entry
  if (tempIndex === -1) {
    tempIndex = volumeCorrectionTable.length - 1;
    tempLower = tempUpper = volumeCorrectionTable[tempIndex].temperature;
  }

  // Find surrounding density points
  let densityLower = 0.500;
  let densityUpper = 0.500;
  let densityLowerIndex = 0;
  let densityUpperIndex = 0;

  for (let i = 0; i < densityRange.length; i++) {
    if (densityRange[i] >= clampedDensity) {
      densityUpper = densityRange[i];
      densityUpperIndex = i;
      if (i > 0) {
        densityLower = densityRange[i - 1];
        densityLowerIndex = i - 1;
      } else {
        densityLower = densityUpper;
        densityLowerIndex = densityUpperIndex;
      }
      break;
    }
  }

  // If density is beyond table range, use last entry
  if (clampedDensity > densityRange[densityRange.length - 1]) {
    densityLowerIndex = densityUpperIndex = densityRange.length - 1;
    densityLower = densityUpper = densityRange[densityRange.length - 1];
  }

  // Get correction factors for interpolation
  const densityLowerKey = densityLower.toFixed(3);
  const densityUpperKey = densityUpper.toFixed(3);

  let factor1, factor2, factor3, factor4;

  if (tempIndex === 0 || tempLower === tempUpper) {
    // Only one temperature point available
    const tempData = volumeCorrectionTable[tempIndex].factors;
    factor1 = factor3 = tempData[densityLowerKey] || 1.0;
    factor2 = factor4 = tempData[densityUpperKey] || 1.0;
  } else {
    // Two temperature points available
    const tempDataLower = volumeCorrectionTable[tempIndex - 1].factors;
    const tempDataUpper = volumeCorrectionTable[tempIndex].factors;
    
    factor1 = tempDataLower[densityLowerKey] || 1.0; // temp lower, density lower
    factor2 = tempDataLower[densityUpperKey] || 1.0; // temp lower, density upper
    factor3 = tempDataUpper[densityLowerKey] || 1.0; // temp upper, density lower
    factor4 = tempDataUpper[densityUpperKey] || 1.0; // temp upper, density upper
  }

  // Bilinear interpolation
  let result;
  if (densityLower === densityUpper && tempLower === tempUpper) {
    // Exact match
    result = factor1;
  } else if (tempLower === tempUpper) {
    // Linear interpolation by density only
    const densityRatio = (clampedDensity - densityLower) / (densityUpper - densityLower);
    result = factor1 + (factor2 - factor1) * densityRatio;
  } else if (densityLower === densityUpper) {
    // Linear interpolation by temperature only
    const tempRatio = (clampedTemperature - tempLower) / (tempUpper - tempLower);
    result = factor1 + (factor3 - factor1) * tempRatio;
  } else {
    // Full bilinear interpolation
    const tempRatio = (clampedTemperature - tempLower) / (tempUpper - tempLower);
    const densityRatio = (clampedDensity - densityLower) / (densityUpper - densityLower);
    
    const interpUpper = factor3 + (factor4 - factor3) * densityRatio;
    const interpLower = factor1 + (factor2 - factor1) * densityRatio;
    result = interpLower + (interpUpper - interpLower) * tempRatio;
  }

  return Number(result.toFixed(6));
}

/**
 * Get available density range from the table
 */
export function getDensityRange(): [number, number] {
  return [densityRange[0], densityRange[densityRange.length - 1]];
}

/**
 * Get available temperature range from the table
 */
export function getTemperatureRange(): [number, number] {
  return [
    volumeCorrectionTable[0].temperature,
    volumeCorrectionTable[volumeCorrectionTable.length - 1].temperature
  ];
}