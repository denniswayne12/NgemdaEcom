// components/authentication/PasswordStrengthMeter.js
import React from 'react';

export default function PasswordStrengthMeter({ password }) {
  // No need to check password here as it's only rendered when password exists

  const calculateStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const strength = calculateStrength(password);
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];

  const strengthPercentage = (strength / 4) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">Password Strength</span>
        <span className={`font-medium ${strengthColor[strength]}`}>
          {strengthText[strength]}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${strengthColor[strength]}`}
          style={{ width: `${strengthPercentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Use at least 8 characters with a mix of letters, numbers & symbols
      </div>
    </div>
  );
}