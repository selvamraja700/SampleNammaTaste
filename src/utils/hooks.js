import { useState, useEffect, useCallback } from 'react';

export const useMarquee = (messages, intervalMs = 5000) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('enter');
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('exit');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setDirection('enter');
      }, 300);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [messages.length, intervalMs]);
  return { index, direction };
};

export const useRateLimiter = (key, maxOrders, windowMs) => {
  const canPlaceOrder = useCallback(() => {
    const stored = localStorage.getItem(key);
    let timestamps = stored ? JSON.parse(stored) : [];
    const now = Date.now();
    timestamps = timestamps.filter(ts => now - ts < windowMs);
    if (timestamps.length >= maxOrders) {
      const oldest = timestamps[0];
      const waitMinutes = Math.ceil((windowMs - (now - oldest)) / 60000);
      return { allowed: false, waitMinutes };
    }
    return { allowed: true };
  }, [key, maxOrders, windowMs]);

  const recordOrder = useCallback(() => {
    const stored = localStorage.getItem(key);
    let timestamps = stored ? JSON.parse(stored) : [];
    timestamps.push(Date.now());
    const now = Date.now();
    timestamps = timestamps.filter(ts => now - ts < windowMs);
    localStorage.setItem(key, JSON.stringify(timestamps));
  }, [key, windowMs]);

  return { canPlaceOrder, recordOrder };
};

export const useFormValidation = (initialState, validators) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};
    Object.keys(validators).forEach(field => {
      const error = validators[field](values[field], values);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validators]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const reset = useCallback(() => setValues(initialState), [initialState]);

  return { values, setValues, errors, handleChange, validate, reset };
};
