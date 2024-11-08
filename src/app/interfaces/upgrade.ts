import { Component, Type } from "@angular/core";

export interface Upgrade {
  id: number;
  name: string;
  cost: number;
  costIncrease: number;
  pointsIncrease: number;
  count: number;
  requiredPoints: number;
  icon?: Type<Component>;
}