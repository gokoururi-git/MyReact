import { UseStateStore } from "./types";

export const ReactState = {
  isInitializeFinished: false,
  stateStack: [] as UseStateStore<unknown>[]
}