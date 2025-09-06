'use client';
import React, { useRef, useEffect } from 'react';



const OtpInput = ({ otp, setOtp, length = 6 }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus the first input on initial render
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    const value = element.value;
    // Allow only digits
    if (isNaN(value)) return;

    // Update the OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    // Move to next input if a digit is entered
    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
   
    if (e.key === 'Backspace') {
        if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1].focus();
    } else {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp.join(''));
    }
    }
    // Handle arrow keys for navigation
    else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1].focus();
    }
    else if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1].focus();
    }
};

const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length).split('');

    const newOtp = [...Array(length)].map((_, i) => pastedData[i] || '');
    setOtp(newOtp.join(''));

    // Focus the last pasted digit or the first empty field
    const lastFilledIndex = newOtp.findIndex((digit, i) => digit === '' && i > 0) - 1;
    const focusIndex = lastFilledIndex >= 0 ? lastFilledIndex : Math.min(pastedData.length, length - 1);
    if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
    }
};

return (
    <div className="flex justify-center space-x-3">
        {Array.from({ length }, (_, i) => (
            <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            maxLength="1"
            value={otp[i] || ''}
            onChange={(e) => handleChange(e.target, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
        ))}
    </div>
);
};

export default OtpInput;