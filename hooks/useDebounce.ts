"use client";

import { useState, useEffect } from 'react';

// Hook này nhận một giá trị và chỉ trả về giá trị đó sau một khoảng thời gian chờ (delay)
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Thiết lập một bộ đếm thời gian
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Hủy bộ đếm thời gian nếu giá trị thay đổi (người dùng tiếp tục gõ)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Chỉ chạy lại effect nếu giá trị hoặc delay thay đổi

  return debouncedValue;
}