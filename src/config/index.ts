export enum ProcessMessageTypes {
  START_POLLING,
  STOP_POLLING,
}

export type ProcessMessage = {
  type: ProcessMessageTypes;
};
