'use clientt';

function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-stone-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white tracking-wide">
              Attine
            </h2>
            <p className="mt-2 text-sm text-stone-400 max-w-xs">
              Thoughtful architecture, designed to last.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 text-sm md:flex-row md:gap-10">
            <a
              href="tel:+123456789"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>

            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>

            <a
              href="mailto:hello@attine.com"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        <div className="my-8 h-px bg-stone-700" />

        <p className="text-center text-xs text-stone-500 tracking-wide">
          © {new Date().getFullYear()} Attine. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
