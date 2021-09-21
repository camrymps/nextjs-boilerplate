import { signIn, SignInResponse, getSession } from 'next-auth/react';
import { SyntheticEvent, useState, useEffect } from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Alert from '../../components/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const errors: any = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin:
    'There was an error sending a confirmation email to your email address. Please check it and try again.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  default: 'An error occured when trying to authenticate. Please try again.',
};

export default function Login() {
  const { error } = useRouter().query;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [signInErrors, setSignInErrors] = useState<string | string[] | undefined>(undefined);
  const [showEmailAlert, setShowEmailAlert] = useState(false);

  useEffect(() => {
    if (error) {
      setSignInErrors(error);
    }
  }, [error]);

  /**
   * Sign in via email.
   *
   * @param {SyntheticEvent} e
   */
  const emailSignIn = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Remove any previous alerts
    setShowEmailAlert(false);
    setSignInErrors('');

    setLoading(true);

    // @ts-ignore
    const result: SignInResponse = await signIn('email', {
      redirect: false,
      email,
    });

    setLoading(false);

    if (result.error) {
      setSignInErrors(result.error);
    } else {
      setShowEmailAlert(true);

      setEmail('');
    }
  };

  /**
   * Renders an error alert.
   */
  const renderErrorAlert = () => {
    if (signInErrors) {
      if (typeof signInErrors !== 'string') {
        return signInErrors.map((signInError, index) => (
          <div key={`sign-in-error-${index}`} id="error-alert" className="mb-5">
            <Alert type="error" message={errors[signInError] || errors.default} />
          </div>
        ));
      }

      return (
        <div id="error-alert" className="mb-5">
          <Alert type="error" message={errors[signInErrors] || errors.default} />
        </div>
      );
    }

    return null;
  };

  /**
   * Renders an confirmation email alert.
   */
  const renderEmailAlert = (
    <div id="confirmation-alert" className="mb-5">
      <Alert type="info" message="Please check your email for your passwordless sign-in link." />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {showEmailAlert ? renderEmailAlert : null}
          {renderErrorAlert()}

          <form onSubmit={emailSignIn} id="login-form" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  onChange={(e: SyntheticEvent) => setEmail(e.target.value)}
                  value={email || ''}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={
                    loading
                      ? 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm bg-gray-100'
                      : 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  }
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={
                  loading
                    ? 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 opacity-50 cursor-not-allowed'
                    : 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a
                  onClick={() => signIn('facebook')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
              </div>

              <div>
                <a
                  onClick={() => signIn('twitter')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Twitter</span>
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </div>

              <div>
                <a
                  onClick={() => signIn('google')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <FontAwesomeIcon icon={faGoogle} size="lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Retrieves the session information, which is then passed to the component via props.
 *
 * @param context
 */
export async function getServerSideProps(context: NextPageContext) {
  const res: NextPageContext['res'] = context.res;

  const session = await getSession(context);

  if (res && session?.user) {
    // User is already authenticated

    res.setHeader('location', '/');

    res.statusCode = 302;

    res.end();
  }

  return {
    props: {},
  };
}
