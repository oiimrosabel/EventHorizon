export type DurationInSeconds = `${number}s`;

export interface AnimationStep {
  duration: DurationInSeconds;
  classTag: string;
  callback: () => void;
}
