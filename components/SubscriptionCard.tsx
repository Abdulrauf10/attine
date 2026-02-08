'use client';

import { Check } from 'lucide-react';

type SubscriptionCardProps = {
  title: string;
  description?: string;
  price: string;
  features?: string[];
  highlighted?: boolean;
  selected?: boolean;
  onSelect?: () => void;
};

export default function SubscriptionCard({
  title,
  description,
  price,
  features,
  highlighted = false,
  selected = false,
  onSelect,
}: SubscriptionCardProps) {
  return (
    <div
      aria-label={`Select ${title} plan`}
      className="group relative w-full rounded-2xl
                 bg-white p-6 text-left
                 shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                 transition-all duration-300 ease-out
                 hover:-translate-y-2
                 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
                 flex flex-col"
    >
      {highlighted && (
        <span className="absolute right-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-black">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-gray-600">{description}</p>

      <div className="mt-6">
        <span className="text-xl lg:text-2xl md:text-2xl font-bold">
          {price}
        </span>
      </div>

      <div className="my-6 h-px bg-gray-200" />

      <ul className="space-y-3 flex-1">
        {features?.map((feature, index) => (
          <li key={index} className="flex gap-2 text-sm">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold
          ${
            selected
              ? 'bg-[#085870] text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }
        `}
      >
        {selected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}
