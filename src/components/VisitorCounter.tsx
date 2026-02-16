'use client';

import { useEffect, useState, useRef } from 'react';

// Her basamak için yukarı kayan sayı animasyonu
function RollingDigit({ target, delay }: { target: number; delay: number }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    // Eğer hedef 0 ise animasyon gereksiz
    if (target === 0) {
      setCurrentValue(0);
      return;
    }

    let current = 0;
    // Toplam animasyon süresi ~800ms, her adım eşit
    const stepTime = Math.max(60, 800 / target);

    intervalRef.current = setInterval(() => {
      current += 1;
      setCurrentValue(current);
      if (current >= target) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, stepTime);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started, target]);

  return (
    <span className="inline-flex items-center justify-center w-10 h-12 rounded-md bg-gray-700/60 border border-gray-600/50 text-xl font-light text-blue-300 tabular-nums">
      {currentValue}
    </span>
  );
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const COOLDOWN_HOURS = 24;
    const COOLDOWN_MS = COOLDOWN_HOURS * 60 * 60 * 1000;

    const lastVisitStr = localStorage.getItem('nilbatu_last_visit');
    const now = Date.now();

    const isNewVisitor = !lastVisitStr || (now - parseInt(lastVisitStr, 10)) > COOLDOWN_MS;

    if (isNewVisitor) {
      fetch('/api/visitor-count', { method: 'POST' })
        .then((res) => res.json())
        .then((data) => {
          setCount(data.count);
          localStorage.setItem('nilbatu_last_visit', now.toString());
        })
        .catch(() => {
          fetch('/api/visitor-count')
            .then((res) => res.json())
            .then((data) => setCount(data.count));
        });
    } else {
      fetch('/api/visitor-count')
        .then((res) => res.json())
        .then((data) => setCount(data.count));
    }
  }, []);

  if (count === null) return null;

  // 4 basamaklı formata dönüştür: 0001, 0023, 0456, 1234
  const padded = count.toString().padStart(4, '0');
  const digits = padded.split('').map(Number);

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xl font-light text-gray-400">Ziyaretçi sayısı :</span>
      <div className="flex gap-1.5">
        {digits.map((digit, index) => (
          <RollingDigit
            key={index}
            target={digit}
            delay={index * 200}
          />
        ))}
      </div>
    </div>
  );
}
