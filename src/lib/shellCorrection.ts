export const shellCorrectionFactorsTank2: Record<number, number> = {
  15: 0.999890,
  16: 0.999912,
  17: 0.999934,
  18: 0.999956,
  19: 0.999978,
  20: 1.000000,
  21: 1.000022,
  22: 1.000044,
  23: 1.000066,
  24: 1.000088,
};

/**
 * Get shell correction factor for Tank 2 based on shell temperature.
 * Returns 1.0 if temperature is outside the provided range.
 */
export function getShellCorrectionFactorTank2(temperature: number): number {
  const roundedTemp = Math.round(temperature);
  return (
    shellCorrectionFactorsTank2[roundedTemp as keyof typeof shellCorrectionFactorsTank2] ||
    1.0
  );
}
