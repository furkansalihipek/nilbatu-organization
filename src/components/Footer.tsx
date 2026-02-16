'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config, library } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import VisitorCounter from './VisitorCounter';

config.autoAddCss = false;
library.add(faInstagram);
library.add(faFacebook);


export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-blue-300 mb-4 tracking-wide">NİLBATU</h3>
            <p className="text-gray-200 mb-4 leading-relaxed">
              Profesyonel organizasyon hizmetleri ile etkinliklerinizi unutulmaz kılıyoruz.
              Kaliteli ekipman ve uzman ekibimizle hizmetinizdeyiz.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/nilbatu.org?rdid=xuD4jwZPc74VbcwL&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16o2pfz5pD%2F%3Fref%3Dwaios.fb_links_xma_control#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-300 transition-colors duration-200 p-2 hover:bg-gray-700 rounded-full">
                <span className="sr-only">Facebook</span>
                <FontAwesomeIcon icon={["fab", "facebook"]} 
                className="text-white h-6 w-6"/>
              </a>
              <a href="https://www.instagram.com/nb_ses_isik_sahne_sistemleri/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-300 transition-colors duration-200 p-2 hover:bg-gray-700 rounded-full">
                <span className="sr-only">Instagram</span>
                <FontAwesomeIcon
                  icon={["fab", "instagram"]}
                  className="text-white h-6 w-6"
                />

              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-200 hover:text-blue-300 transition-colors duration-200 hover:underline">
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-200 hover:text-blue-300 transition-colors duration-200 hover:underline">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/cihazlarimiz" className="text-gray-200 hover:text-blue-300 transition-colors duration-200 hover:underline">
                  Cihazlarımız
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-200 hover:text-blue-300 transition-colors duration-200 hover:underline">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">İletişim</h4>
            <div className="space-y-2 text-gray-200">
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                0 (542) 802 76 17
              </p>
              <p className="flex items-center">
                <span className="mr-2">📧</span>
                info@nilbatuorg.com
              </p>
              <p className="flex items-center">
                <span className="mr-2">📍</span>
                İzmir, Türkiye
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} NİLBATU. Tüm hakları saklıdır.</p>
            <VisitorCounter />
          </div>
        </div>
      </div>
    </footer>
  );
} 