import { Deposit } from './Deposit';
import { Withdrawal } from './Withdrawal';
import { Transfer } from './Transfer';
import { Payment } from './Payment';

export class MovementFactory {
  static createMovement(data) {
    const normalizedType = data.type.toLowerCase();
    
    switch(normalizedType) {
      case 'deposit':
        return new Deposit(data);
      case 'withdrawal':
        return new Withdrawal(data);
      case 'transfer':
        return new Transfer(data);
      case 'payment':
        return new Payment(data);
      default:
        throw new Error(`Tipo de movimiento desconocido: ${data.type}`);
    }
  }
}