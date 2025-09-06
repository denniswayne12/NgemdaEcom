'use client';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase/supabaseClient';

const EmailVerificationModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: Confirmation
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;

      setStep(2);
      setSuccessMessage('Check your email for the sign-in link!');
    } catch (err) {
      setError(err.message || 'Failed to send sign-in link.');
    }
  };

  const handleSocialLogin = (provider) => {
    supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <div style={styles.modalContainer}>
      <div style={styles.modalContent}>
        {/* Close Button */}
        <button onClick={onClose} style={styles.closeButton}>
          ×
        </button>

        {/* Step Indicator */}
        <div style={styles.stepIndicator}>
          <div style={styles.stepNumber}>
            {step === 1 ? '1' : <CheckIcon />}
          </div>
          <div style={styles.stepLabel}>
            {step === 1 ? 'Sign in with Email' : 'Check your inbox'}
          </div>
        </div>

        {/* Form */}
        {step === 1 && (
          <>
            <h2 style={styles.title}>Welcome Back</h2>
            <p style={styles.subtitle}>Enter your email to sign in</p>

            <form onSubmit={handleSubmitEmail}>
              <div style={styles.inputContainer}>
                <label htmlFor="email" style={styles.inputLabel}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={styles.inputIcon}>📧</span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.inputField}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <button type="submit" style={styles.primaryButton}>
                Send Sign-In Link
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <div style={styles.confirmationScreen}>
            <h2 style={styles.title}>Check Your Email</h2>
            <p style={styles.subtitle}>
              We've sent a sign-in link to <strong>{email}</strong>
            </p>
            <p style={{ ...styles.subtitle, fontSize: 'var(--font-size-sm)' }}>
              Click the link to sign in instantly.
            </p>
          </div>
        )}

        {/* Error */}
        {error && <p style={styles.errorMessage}>{error}</p>}

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>or continue with</span>
          <div style={styles.dividerLine}></div>
        </div>

        {/* Social Buttons */}
        <button
          type="button"
          style={styles.socialButton}
          onClick={() => handleSocialLogin('google')}
        >
          <img src="/icons/google.svg" alt="Google" style={styles.socialIcon} />
          Google
        </button>
        <button
          type="button"
          style={styles.socialButton}
          onClick={() => handleSocialLogin('github')}
        >
          <img src="/icons/github.svg" alt="GitHub" style={styles.socialIcon} />
          GitHub
        </button>
        <button
          type="button"
          style={styles.socialButton}
          onClick={() => handleSocialLogin('azure')}
        >
          <img src="/icons/microsoft.svg" alt="Microsoft" style={styles.socialIcon} />
          Microsoft
        </button>
      </div>
    </div>
  );
};

// ✅ Inline Styles Using Design Tokens
const styles = {
  modalContainer: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'var(--color-overlay)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    padding: 'var(--spacing-4)',
    animation: 'fadeIn 300ms ease-out',
  },

  modalContent: {
    backgroundColor: 'var(--color-surface-modal)',
    borderRadius: 'var(--border-radius-xl)',
    boxShadow: 'var(--shadow-modal)',
    width: '100%',
    maxWidth: '400px',
    padding: 'var(--spacing-8)',
    position: 'relative',
    animation: 'scaleIn 200ms ease-out',
  },

  closeButton: {
    position: 'absolute',
    top: 'var(--spacing-4)',
    right: 'var(--spacing-4)',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-neutral-400)',
    fontSize: 'var(--font-size-xl)',
    cursor: 'pointer',
    padding: 'var(--spacing-2)',
    borderRadius: 'var(--border-radius-sm)',
  },

  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 'var(--spacing-6)',
  },

  stepNumber: {
    width: '32px',
    height: '32px',
    backgroundColor: 'var(--color-primary-blue)',
    color: 'var(--color-neutral-white)',
    borderRadius: 'var(--border-radius-full)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-semibold)',
    marginRight: 'var(--spacing-4)',
    flexShrink: 0,
  },

  stepLabel: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-neutral-white)',
  },

  title: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-neutral-white)',
    textAlign: 'center',
    marginBottom: 'var(--spacing-2)',
  },

  subtitle: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-neutral-400)',
    textAlign: 'center',
    marginBottom: 'var(--spacing-8)',
  },

  inputContainer: {
    marginBottom: 'var(--spacing-4)',
  },

  inputLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-neutral-300)',
    marginBottom: 'var(--spacing-2)',
    display: 'block',
  },

  inputIcon: {
    position: 'absolute',
    left: 'var(--spacing-3)',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-neutral-500)',
    fontSize: 'var(--font-size-lg)',
  },

  inputField: {
    width: '100%',
    padding: 'var(--spacing-3) var(--spacing-4)',
    paddingLeft: '40px', // make room for icon
    backgroundColor: 'var(--color-surface-input)',
    border: '1px solid var(--color-neutral-600)',
    borderRadius: 'var(--border-radius-md)',
    color: 'var(--color-neutral-white)',
    fontSize: 'var(--font-size-base)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },

  primaryButton: {
    backgroundColor: 'var(--color-primary-blue)',
    color: 'var(--color-neutral-white)',
    padding: 'var(--spacing-3) var(--spacing-6)',
    borderRadius: 'var(--border-radius-md)',
    border: 'none',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-semibold)',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    width: '100%',
    marginTop: 'var(--spacing-2)',
  },

  socialButton: {
    backgroundColor: 'var(--color-surface-button)',
    color: 'var(--color-neutral-white)',
    padding: 'var(--spacing-3) var(--spacing-4)',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--color-neutral-600)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-medium)',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'var(--spacing-3)',
  },

  socialIcon: {
    width: '20px',
    height: '20px',
    marginRight: 'var(--spacing-3)',
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: 'var(--spacing-6) 0',
    gap: 'var(--spacing-4)',
  },

  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: 'var(--color-neutral-600)',
  },

  dividerText: {
    color: 'var(--color-neutral-400)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
  },

  errorMessage: {
    color: '#EF4444',
    fontSize: 'var(--font-size-sm)',
    marginTop: 'var(--spacing-2)',
    textAlign: 'center',
  },

  confirmationScreen: {
    textAlign: 'center',
  },
};

// Simple checkmark icon for step 2
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5L6 11L4 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default EmailVerificationModal;