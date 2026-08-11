"use client";

const STAGES = [
  { key: "confirmed", label: "Confirmed" },
  { key: "dispatched", label: "Dispatched" },
  { key: "in_transit", label: "In Transit" },
  { key: "delivered", label: "Delivered" },
] as const;

type Stage = (typeof STAGES)[number]["key"];

export type OrderCardData = {
  id: string;
  pickupAddress: string;
  deliveryAddress: string;
  price: string | null;
  paidAt: Date | null;
  truckTypeName: string | null;
  fulfillmentStatus: string;
  stageDates: Partial<Record<Stage, Date>>;
};

export function OrderCard({ order }: { order: OrderCardData }) {
  const currentIndex = Math.max(
    0,
    STAGES.findIndex((s) => s.key === order.fulfillmentStatus)
  );

  return (
    <div className="order-card">
      <div className="order-card__header">
        <div>
          <p className="order-card__route">
            {order.pickupAddress} <span className="order-card__arrow">&rarr;</span> {order.deliveryAddress}
          </p>
          <p className="order-card__meta">
            {order.truckTypeName ?? "Freight shipment"}
            {order.paidAt ? ` · Paid ${order.paidAt.toLocaleDateString()}` : ""}
          </p>
        </div>
        {order.price ? <p className="order-card__price">${Number(order.price).toFixed(2)}</p> : null}
      </div>

      <div className="order-stepper">
        {STAGES.map((stage, index) => {
          const reached = index <= currentIndex;
          const date = order.stageDates[stage.key];
          return (
            <div key={stage.key} className={reached ? "order-step order-step--done" : "order-step"}>
              <div className="order-step__dot" />
              <div className="order-step__label">{stage.label}</div>
              {date ? <div className="order-step__date">{date.toLocaleDateString()}</div> : null}
              {index < STAGES.length - 1 ? (
                <div className={index < currentIndex ? "order-step__line order-step__line--done" : "order-step__line"} />
              ) : null}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .order-card {
          background: #fff;
          border-radius: 1rem;
          border: 1px solid var(--c-dark-green-15);
          padding: 1.75rem;
          margin-bottom: 1.25rem;
        }
        .order-card__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }
        .order-card__route {
          font-weight: 700;
          color: var(--c-dark-green);
          font-size: 1.02rem;
          margin: 0 0 0.25rem;
        }
        .order-card__arrow {
          color: var(--c-lime);
          font-weight: 700;
        }
        .order-card__meta {
          font-size: 0.85rem;
          color: rgba(5, 36, 36, 0.55);
          margin: 0;
        }
        .order-card__price {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--c-dark-green);
          white-space: nowrap;
        }
        .order-stepper {
          display: flex;
          align-items: flex-start;
        }
        .order-step {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .order-step__dot {
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 50%;
          background: var(--c-dark-green-15);
          margin-bottom: 0.5rem;
          z-index: 1;
        }
        .order-step--done .order-step__dot {
          background: var(--c-lime);
        }
        .order-step__label {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(5, 36, 36, 0.45);
        }
        .order-step--done .order-step__label {
          color: var(--c-dark-green);
        }
        .order-step__date {
          font-size: 0.7rem;
          color: rgba(5, 36, 36, 0.4);
          margin-top: 0.15rem;
        }
        .order-step__line {
          position: absolute;
          top: 0.44rem;
          left: 50%;
          width: 100%;
          height: 2px;
          background: var(--c-dark-green-15);
        }
        .order-step__line--done {
          background: var(--c-lime);
        }
      `}</style>
    </div>
  );
}
