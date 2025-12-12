import { Movement } from './Movement.js';

export class Chargeback extends Movement {
  getNetAmount() {
    return -Math.abs(this.amount);
  }

  getColor() {
    return '#8b0000';
  }

  getIcon() {
    return '↩️';
  }

  getTypeName() {
    return 'Contracargo';
  }
}