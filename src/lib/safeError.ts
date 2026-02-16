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
    'user_already_exists': 'An account with this email already exists.',
    'email_not_confirmed': 'Please verify your email before signing in.',
  };

  return safeMessages[code] || 'Something went wrong. Please try again.';
}
