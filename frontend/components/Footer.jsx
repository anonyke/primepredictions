'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-3">⚡ PrimePredict</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Kenya&apos;s most trusted football prediction platform. Expert analysis, premium tips, data-driven insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="/predictions" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Free Predictions</a>
              <a href="/premium" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Premium Tips</a>
              <a href="/pricing" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Pricing</a>
              <a href="/results" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Results</a>
            </div>
          </div>

          {/* Predictions */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Predictions</h4>
            <div className="flex flex-col gap-2">
              <a href="/predictions" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">1X2 Predictions</a>
              <a href="/predictions" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Over/Under</a>
              <a href="/predictions" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">BTTS</a>
              <a href="/predictions" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Correct Score</a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Support</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Help Center</a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Contact Us</a>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <hr className="border-gray-800 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} PrimePredict. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">Telegram</a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm no-underline transition">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
