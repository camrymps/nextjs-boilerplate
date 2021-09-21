import { Fragment, SyntheticEvent } from 'react';
import type { NextPage, NextPageContext } from 'next';
import Image from 'next/image';
import { getSession, signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Home: NextPage = ({ session }) => {
  return (
    <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {session && session.user ? (
        <Fragment>
          <Image
            src={session.user.image}
            alt={`Avatar of ${session.user.email}`}
            width={50}
            height={50}
            className="rounded-full"
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            You're logged in as {session.user.email}
          </h3>
          <div className="mt-6">
            <button
              onClick={(e: SyntheticEvent) => signOut()}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout&nbsp;&nbsp;
              <FontAwesomeIcon icon={faSignOutAlt} size="sm" />
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Image
            src="https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">You're not logged in!</h3>
          <div className="mt-6">
            <a
              href="/auth/login"
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login&nbsp;&nbsp;
              <FontAwesomeIcon icon={faSignInAlt} size="sm" />
            </a>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Home;

/**
 * Retrieves the session information, which is then passed to the component via props.
 *
 * @param context
 */
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
