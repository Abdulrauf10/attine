'use client';

type AddOnCardProps = {
  title: string;
  price: string;
  selected?: boolean;
  background?: string;
  onSelect?: () => void;
};

export default function AddonCard({
  title,
  price,
  selected = false,
  background,
  onSelect,
}: AddOnCardProps) {
  return (
    <div
      aria-label={`Select ${title}`}
      className={`group relative h-full w-full overflow-hidden rounded-2xl
        transition-all duration-300
        ${
          selected
            ? 'ring-2 ring-[#085870] shadow-[0_25px_60px_rgba(99,102,241,0.25)]'
            : 'hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]'
        }
      `}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full flex-col p-6 text-left text-white">
        <h3 className="text-xl font-semibold">{title}</h3>

        <div className="mt-6">
          <span className="text-xl lg:text-2xl font-bold">{price}</span>
        </div>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={onSelect}
            className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all
            ${selected ? 'bg-yellow-400 text-black' : 'bg-white text-black '}
          `}
          >
            {selected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
}
