/** Maps raw Supabase/API errors to safe user-facing messages */
export function getSafeErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') return 'Something went wrong. Please try again.';

  const err = error as Record<string, any>;
  const code = err.code || err.error_code || '';

  const safeMessages: Record<string, string> = {
    '23505': 'This item already exists.',
    '23503': 'Invalid reference provided.',
    '42501': 'You do not have permission to perform this action.',
    'PGRST301': 'You need to be logged in.',
    'invalid_credentials': 'Invalid email or password.',
    'user_already_exists': 'An account with this email already exists. Please sign in instead.',
    'email_not_confirmed': 'Please verify your email before signing in.',
    'email_exists': 'An account with this email already exists.',
    'signup_disabled': 'Sign ups are currently disabled.',
    'over_request_rate_limit': 'Too many requests. Please wait a moment and try again.',
    'weak_password': 'Password is too weak. Please use a stronger password.',
    'same_password': 'New password must be different from the old password.',
    'otp_expired': 'The verification link has expired. Please request a new one.',
  };

  // Also check the message string for common patterns
  const msg = (err.message || err.msg || err.error_description || '').toString().toLowerCase();

  if (safeMessages[code]) return safeMessages[code];

  if (msg.includes('user already registered')) return 'An account with this email already exists. Please sign in or check your email for verification.';
  if (msg.includes('email rate limit')) return 'Too many signup attempts. Please wait a few minutes and try again.';
  if (msg.includes('email not confirmed')) return 'Please check your email and verify your account before signing in.';
  if (msg.includes('invalid login')) return 'Invalid email or password.';
  if (msg.includes('password')) return msg.charAt(0).toUpperCase() + msg.slice(1);

  return 'Something went wrong. Please try again.';
}
