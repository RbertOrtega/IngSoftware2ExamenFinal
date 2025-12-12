import MovementCard from './MovementCard';
import './MovementList.css';
import { MovementFactory } from '../models/MovementFactory';

function MovementList({ movementsData }) {
  const movements = movementsData.map(data => MovementFactory.createMovement(data));

  const totalBalance = movements.reduce((sum, m) => sum + m.getNetAmount(), 0);

  const formatBalance = (amount) => {
    const isPositive = amount >= 0;
    const formatted = Math.abs(amount).toLocaleString('es-HN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${isPositive ? '+' : '-'} L ${formatted}`;
  };

  return (
    <div className="movement-list-container">
      <div className="balance-summary">
        <span className="balance-label">Balance Neto</span>
        <span className={`balance-amount ${totalBalance >= 0 ? 'positive' : 'negative'}`}>
          {formatBalance(totalBalance)}
        </span>
      </div>
      <div className="movement-list">
        {movements.map(movement => (
          <MovementCard key={movement.id} movement={movement} />
        ))}
      </div>
    </div>
  );
}

export default MovementList;