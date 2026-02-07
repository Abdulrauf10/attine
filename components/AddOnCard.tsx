'use client';

type AddOnCardProps = {
  title: string;
  price: string;
  selected?: boolean;
  onSelect?: () => void;
};

export default function AddonCard({
  title,
  price,
  selected = false,
  onSelect,
}: AddOnCardProps) {
  return (
    <div
      aria-label={`Select ${title}`}
      className={`group relative h-full w-full rounded-2xl bg-white p-6 text-left
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        transition-all duration-300
        ${
          selected
            ? 'ring-2 ring-indigo-500 shadow-[0_25px_60px_rgba(99,102,241,0.25)]'
            : 'hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]'
        }
      `}
    >
      <div className="relative z-10 flex h-full flex-col">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

        <div className="mt-6">
          <span className="text-xl lg:text-2xl font-bold text-gray-900">
            {price}
          </span>
        </div>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={onSelect}
            className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all
              ${
                selected
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }
            `}
          >
            {selected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
}
