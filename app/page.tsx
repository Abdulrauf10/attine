'use client';

import SubscriptionCard from '@/components/SubscriptionCard';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Footer from '@/components/Footer';
import AddonCard from '@/components/AddOnCard';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

type SelectedPlan = {
  title: string;
  price: number;
  formattedPrice: string;
};

type Addon = {
  title: string;
  price: number;
};

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [luasBangunan, setLuasBangunan] = useState<number | null>(null);
  const [jumlahLantai, setJumlahLantai] = useState<number | null>(null);
  const [luasLahan, setLuasLahan] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsSubmitted(false);
    setSelectedPlan(null);
    setSelectedAddons([]);
  }, [luasBangunan, luasLahan, jumlahLantai]);

  const images = [
    {
      src: '/images/slide1.png',
      title: 'Attine.co',
      subtitle:
        'Kami membantu mengubah kebutuhan, gaya hidup, dan visi Anda menjadi konsep arsitektur yang jelas dan terarah.',
    },
    {
      src: '/images/slide2.jpeg',
      title: 'Attine.co',
      subtitle:
        'Gambar kerja kami membantu proses pembangunan berjalan lebih lancar, meminimalkan kesalahan, dan mengontrol biaya.',
    },
    {
      src: '/images/slide3.jpeg',
      title: 'Attine.co',

      subtitle:
        'Setiap ruang dirancang agar nyaman digunakan, efisien, dan tetap memiliki nilai visual yang selaras dengan karakter Anda.',
    },
    {
      src: '/images/slide4.jpeg',
      title: 'Attine.co',
      subtitle:
        'Kami memastikan setiap tahap berjalan sesuai konsep desain dan tujuan proyek yang telah disepakati.',
    },
  ];

  const SUBSCRIPTION_RATE_LEVEL_1 = 25_000;
  const SUBSCRIPTION_RATE_LEVEL_2 = 50_000;
  const SUBSCRIPTION_RATE_LEVEL_3 = 100_000;
  const SUBSCRIPTION_RATE_LEVEL_4 = 6_000_000;
  const ADDON_RATE_RAB = 10_000;
  const ADDON_RATE_SPEC = 5_000;
  const ADDON_RATE_STRUKTUR = 35_000;
  const ADDON_RATE_ANIMASI = 20_000;
  const PERCENT_11 = 0.11;
  const PERCENT_5 = 0.05;

  const baseArea =
    luasBangunan !== null && jumlahLantai !== null
      ? luasBangunan * jumlahLantai
      : 0;

  const subscriptionPriceLevel1 =
    baseArea > 0 ? baseArea * SUBSCRIPTION_RATE_LEVEL_1 * (1 + PERCENT_11) : 0;

  const subscriptionPriceLevel2 =
    baseArea > 0 ? baseArea * SUBSCRIPTION_RATE_LEVEL_2 * (1 + PERCENT_11) : 0;
  const subscriptionPriceLevel3 =
    baseArea > 0 ? baseArea * SUBSCRIPTION_RATE_LEVEL_3 * (1 + PERCENT_11) : 0;

  const subscriptionPriceLevel4 =
    baseArea > 0 ? baseArea * SUBSCRIPTION_RATE_LEVEL_4 * PERCENT_5 : 0;

  const addonPriceRab =
    baseArea > 0 ? baseArea * ADDON_RATE_RAB * (1 + PERCENT_11) : 0;
  const addonPriceSpec =
    baseArea > 0 ? baseArea * ADDON_RATE_SPEC * (1 + PERCENT_11) : 0;
  const addonPriceStruktur =
    baseArea > 0 ? baseArea * ADDON_RATE_STRUKTUR * (1 + PERCENT_11) : 0;
  const addonPriceAnimasi =
    baseArea > 0 ? baseArea * ADDON_RATE_ANIMASI * (1 + PERCENT_11) : 0;

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value);

  const toggleAddon = (addon: Addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.find((a) => a.title === addon.title);

      if (exists) {
        return prev.filter((a) => a.title !== addon.title);
      }

      return [...prev, addon];
    });
  };

  const whatsappMessage = `
  Halo Attine

  Saya punya luas lahan dan bangunan sebagai berikut.

  - Luas Lahan: ${luasLahan} m²
  - Luas Bangunan: ${luasBangunan} m²
  - Jumlah Lantai: ${jumlahLantai}

  Saya tertarik dengan layanan:

  Paket:
  ${selectedPlan ? `${selectedPlan.title} - ${formatRupiah(selectedPlan.price)}` : '-'}

  Add-on:
  ${
    selectedAddons.length > 0
      ? selectedAddons
          .map((addon) => `${addon.title} (${formatRupiah(addon.price)})`)
          .join('\n')
      : 'Tidak ada'
  }

  Terima kasih
  `;

  const whatsappUrl = `https://wa.me/6285729003763?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  const [deck, setDeck] = useState([
    { title: 'RAB', price: 0 },
    { title: 'Spesifikasi Teknis', price: 0 },
    { title: 'Perhitungan Struktur', price: 0 },
    { title: 'Animasi', price: 0 },
  ]);

  useEffect(() => {
    setDeck((prev) =>
      prev.map((addon) => ({
        ...addon,
        price:
          addon.title === 'RAB'
            ? addonPriceRab
            : addon.title === 'Spesifikasi Teknis'
              ? addonPriceSpec
              : addon.title === 'Perhitungan Struktur'
                ? addonPriceStruktur
                : addon.title === 'Animasi'
                  ? addonPriceAnimasi
                  : addon.price,
      })),
    );
  }, [addonPriceRab, addonPriceSpec, addonPriceStruktur, addonPriceAnimasi]);

  const STACK_OFFSET_X = 28;
  const STACK_SCALE = 0.04;

  const rotateDeck = () => {
    setDeck((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <>
      <Carousel className="relative w-full">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-105 xl:h-130 cursor-pointer">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                      {item.title}
                    </h1>
                    <p className="mt-3 max-w-xl text-sm sm:text-base md:text-lg">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white" />
        <CarouselNext className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white" />
      </Carousel>

      <div className="w-full mx-auto mt-8 p-3 flex flex-col lg:max-w-150 md:max-w-150 shadow-xl rounded-2xl gap-5">
        <h4 className="font-semibold">Silahkan diisi</h4>
        <div className="flex lg:flex-row md:flex-row flex-col w-full gap-4">
          <Field>
            <FieldLabel htmlFor="input-field-username">
              Luas lahan (m²)
            </FieldLabel>
            <Input
              type="number"
              placeholder="Input nilai..."
              autoFocus={false}
              value={luasLahan ?? ''}
              className="border-gray-300 focus:border-gray-400 focus:ring-0 focus-visible:ring-0"
              onChange={(e) =>
                setLuasLahan(
                  e.target.value === '' ? null : Number(e.target.value),
                )
              }
              onKeyDown={(e) => {
                if (e.key === '.' || e.key === ',') {
                  e.preventDefault();
                }
              }}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="input-field-username">
              Luas bangunan (m²)
            </FieldLabel>
            <Input
              type="number"
              autoFocus={false}
              placeholder="Input nilai..."
              value={luasBangunan ?? ''}
              onChange={(e) =>
                setLuasBangunan(
                  e.target.value === '' ? null : Number(e.target.value),
                )
              }
              className="border-gray-300 focus:border-gray-400 focus:ring-0 focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === '.' || e.key === ',') {
                  e.preventDefault();
                }
              }}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="input-field-username">
              Jumlah lantai
            </FieldLabel>
            <Input
              type="number"
              placeholder="Input nilai..."
              autoFocus={false}
              value={jumlahLantai ?? ''}
              onChange={(e) =>
                setJumlahLantai(
                  e.target.value === '' ? null : Number(e.target.value),
                )
              }
              className="border-gray-300 focus:border-gray-400 focus:ring-0 focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === '.' || e.key === ',') {
                  e.preventDefault();
                }
              }}
            />
          </Field>
        </div>

        <button
          disabled={!luasBangunan || !luasLahan || !jumlahLantai}
          onClick={() => setIsSubmitted(true)}
          className="px-6 py-2 rounded-full bg-black text-white font-semibold
             disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>

      {isSubmitted ? (
        <>
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:mt-20 mt-20 px-6 lg:px-10 items-stretch">
            <SubscriptionCard
              title="Level 1"
              description="Desain awal berupa denah dan visual 3D untuk membantu memahami konsep bangunan."
              features={[
                'Gambar denah',
                '3D Eksterior',
                '3D Interior Ruang Inti',
              ]}
              selected={selectedPlan?.title === 'Level 1'}
              onSelect={() =>
                setSelectedPlan({
                  title: 'Level 1',
                  price: subscriptionPriceLevel1,
                  formattedPrice: formatRupiah(subscriptionPriceLevel1),
                })
              }
              price={formatRupiah(subscriptionPriceLevel1)}
            />

            <SubscriptionCard
              title="Level 2"
              description="Desain arsitektur dengan gambar teknis dasar dan visual 3D seluruh ruang."
              features={[
                'Gambar denah',
                'Gambar Tampak',
                'Gambar Potongan',
                '3D Eksterior',
                '3D Interior Semua Ruang',
              ]}
              selected={selectedPlan?.title === 'Level 2'}
              onSelect={() =>
                setSelectedPlan({
                  title: 'Level 2',
                  price: subscriptionPriceLevel2,
                  formattedPrice: formatRupiah(subscriptionPriceLevel2),
                })
              }
              price={formatRupiah(subscriptionPriceLevel2)}
            />

            <SubscriptionCard
              title="Level 3"
              highlighted
              description="Gambar kerja lengkap arsitektur, struktur, dan MEP sebagai acuan pembangunan."
              price={formatRupiah(subscriptionPriceLevel3)}
              features={[
                'Gambar denah',
                'Gambar Tampak',
                'Gambar Potongan',
                'Gambar Rencana Arsitektur',
                'Gambar Detail Arsitektur',
                'Gambar Rencana Struktur',
                'Gambar Detail Struktur',
                'Gambar Rencana MEP',
                'Gambar Detail MEP',
                '3D Eksterior',
                '3D Interior Semua Ruang',
              ]}
              selected={selectedPlan?.title === 'Level 3'}
              onSelect={() =>
                setSelectedPlan({
                  title: 'Level 3',
                  price: subscriptionPriceLevel3,
                  formattedPrice: formatRupiah(subscriptionPriceLevel3),
                })
              }
            />

            <SubscriptionCard
              title="Level 4"
              description="Layanan lengkap dari desain, biaya, hingga pengawasan dan manajemen konstruksi."
              price={formatRupiah(subscriptionPriceLevel4)}
              features={[
                'Gambar denah',
                'Gambar Tampak',
                'Gambar Potongan',
                'Gambar Rencana Arsitektur',
                'Gambar Detail Arsitektur',
                'Gambar Rencana Struktur',
                'Gambar Detail Struktur',
                'Gambar Rencana MEP',
                'Gambar Detail MEP',
                '3D Eksterior',
                '3D Interior Semua Ruang',
                'Spesifikasi Teknis',
                'RAB',
                'Pengawasan Berkala',
                'Manajemen Konstruksi',
              ]}
              selected={selectedPlan?.title === 'Level 4'}
              onSelect={() =>
                setSelectedPlan({
                  title: 'Level 4',
                  price: subscriptionPriceLevel4,
                  formattedPrice: formatRupiah(subscriptionPriceLevel4),
                })
              }
            />
          </div>

          <div className="flex items-center justify-center gap-3 mt-20 mb-5 font-bold h-10">
            <div className="h-9 w-3 rounded-full bg-yellow-500 " />
            <h3 className="text-3xl">ADD-ON</h3>
          </div>

          <div className="relative w-full max-w-md mx-auto h-65 mb-20 overflow-visible">
            <div className="relative px-8.75 md:px-0 h-full">
              {deck.slice(0, 3).map((addon, i) => {
                const isTop = i === 0;
                const isSelected = selectedAddons.some(
                  (a) => a.title === addon.title,
                );

                return (
                  <motion.div
                    key={addon.title}
                    className="absolute inset-0"
                    style={{ zIndex: 10 - i }}
                    animate={{
                      x: -i * STACK_OFFSET_X,
                      scale: 1 - i * STACK_SCALE,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    drag={isTop ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) > 120) {
                        rotateDeck();
                      }
                    }}
                  >
                    <div className="px-8.75 md:px-0 h-full">
                      <AddonCard
                        title={addon.title}
                        price={formatRupiah(addon.price)}
                        selected={isSelected}
                        onSelect={() => {
                          toggleAddon({
                            title: addon.title,
                            price: addon.price,
                          });
                          rotateDeck();
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 max-w-75 mx-auto mb-10 rounded-full px-6 py-2 text-white shadow-lg transition
      ${
        !selectedPlan
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-green-500 hover:bg-green-600'
      }`}
              onClick={(e) => {
                if (!selectedPlan) e.preventDefault();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="50"
                height="50"
                fill="currentColor"
              >
                <path d="M19.11 17.79c-.29-.14-1.71-.84-1.97-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.91 1.13-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44 0 1.44 1.03 2.83 1.17 3.02.14.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.12.55-.08 1.71-.7 1.95-1.38.24-.67.24-1.25.17-1.38-.07-.13-.26-.21-.55-.36z" />
              </svg>

              <span className="font-semibold">
                {selectedPlan
                  ? 'Chat via WhatsApp'
                  : 'Silahkan Pilih Paket dulu'}
              </span>
            </a>
          </div>
        </>
      ) : (
        <div className="h-[70vh] w-full flex flex-col items-center justify-center">
          <Image
            src="/images/bni.png"
            alt="Attine"
            width={350}
            height={350}
            className="rounded-2xl shadow-2xl"
          />
          <h2 className="text-center text-xl mt-2">
            Silahkan masukkan Luas lahan, luas bangunan, dan <br /> jumlah
            lantai bangunan anda.
          </h2>
        </div>
      )}

      <Footer />
    </>
  );
}
