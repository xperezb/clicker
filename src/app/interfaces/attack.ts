import { Component, Type } from "@angular/core";

export interface Attack {
  id: number;
  name: string;
  points: number;
  icon?: Type<Component>;
}