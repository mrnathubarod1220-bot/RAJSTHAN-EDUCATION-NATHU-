import React from 'react';
import AppLogo from './AppLogo';
import { Mail, Shield, Smartphone, Heart, Users, Calendar, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  const currentYear = new Date().getFullYear();

  return (
    <div id="about-section-root" className="max-w-4xl mx-auto flex flex-col gap-8">
      {/* Brand Hero Splash Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-150 dark:border-slate-700 p-8 shadow-xs text-center flex flex-col items-center gap-4">
        {/* Large Styled Custom Logo */}
        <AppLogo size="lg" className="shadow-2xl hover:scale-105 transition-transform duration-300" />
        
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-none mt-2">
            RAJASTHAN EDUCATION NATHU
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1 tracking-widest uppercase">
            LEARN • PREPARE • SUCCEED
          </p>
        </div>

        <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed font-sans">
          राजस्थान की प्रतियोगी परीक्षाओं (RAS, REET, Patwar, VDO, Police Constable, LDC व अन्य RPSC परीक्षाओं) की गुणवत्तापूर्ण और विश्वसनीय तैयारी के लिए यह एक संपूर्ण लाइव ऑनलाइन अपडेट्स समर्थित शिक्षा सहायक मंच है।
        </p>

        {/* Short motivational badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-full text-xs font-black text-amber-800 dark:text-amber-400">
          <Award className="w-4 h-4" />
          <span>ऑनलाइन लाइव अपडेट्स एवं तैयारी के लिए निर्मित</span>
        </div>
      </div>

      {/* Grid Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key App details */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 shadow-2xs">
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <span>मुख्य विशेषताएं (Core Features)</span>
          </h3>
          <ul className="space-y-3 font-sans">
            <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="text-blue-500 font-bold select-none">✔</span>
              <span><strong>ऑनलाइन लाइव सिंक:</strong> नवीनतम सरकारी भर्तियों, अधिसूचनाओं और परीक्षा तिथियों की लाइव सूचनाएं।</span>
            </li>
            <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="text-blue-500 font-bold select-none">✔</span>
              <span><strong>विस्तृत नोट्स (Hindi Notes):</strong> सरल और स्पष्ट भाषा में परीक्षा उपयोगी सामग्री जो ऑनलाइन अपडेट होती है।</span>
            </li>
            <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="text-blue-500 font-bold select-none">✔</span>
              <span><strong>दैनिक लाइव क्विज (Daily Live Quiz):</strong> तत्काल स्कोर, ऑनलाइन परिणाम विश्लेषण और व्याख्यात्मक उत्तर।</span>
            </li>
            <li className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="text-blue-500 font-bold select-none">✔</span>
              <span><strong>हस्तलिखित नोट्स पुस्तकालय:</strong> बुक रीडर एवं डायरेक्ट डाउनलोड करने की सुविधा।</span>
            </li>
          </ul>
        </div>

        {/* Developer / Credits Details */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              <span>प्रमोटर एवं डेवलपर (Developer Details)</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans mb-4">
              यह एप्लिकेशन <strong>नथू लाल मीणा (Nathu Lal Meena)</strong> द्वारा राजस्थान के सभी ऊर्जावान छात्रों को निःशुल्क, सुलभ और उत्कृष्ट अध्ययन संसाधन प्रदान करने के उद्देश्य से समर्पित है।
            </p>
          </div>

          <div className="border-t border-gray-100 dark:border-slate-700/60 pt-4 flex flex-col gap-3">
            <a
              href="mailto:nathulalmeenarj35@gmail.com"
              className="flex items-center gap-2.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <span>nathulalmeenarj35@gmail.com</span>
            </a>
            <div className="flex items-center gap-2 text-xs text-gray-450">
              <Shield className="w-4 h-4 shrink-0" />
              <span>संस्करण: v1.1.0 (APK-ready Online/Sync stable)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer support note */}
      <div className="text-center text-xs text-gray-450 dark:text-slate-500 font-sans flex items-center justify-center gap-1.5 py-4">
        <span>© {currentYear} RAJASTHAN EDUCATION NATHU.</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        <span>Made for Rajasthan Students.</span>
      </div>
    </div>
  );
}
