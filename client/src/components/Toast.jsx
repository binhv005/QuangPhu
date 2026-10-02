import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-msg">
      <CheckCircle size={20} color="#d4af37" />
      <span>{message}</span>
    </div>
  );
}
