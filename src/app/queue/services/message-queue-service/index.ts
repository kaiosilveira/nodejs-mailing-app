export interface MessageQueue {
  startPolling(callback: Function): void;
}
