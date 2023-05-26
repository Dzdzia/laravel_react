import React from 'react';

const Navigation = () => {
  return (
    <div>
      {Route.has('login') && (
        <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10">
          {auth && (
            <>
              {Auth.user().isAdmin() ? (
                <>
                  <a
                    href={url('/home')}
                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Home
                  </a>
                  <a
                    href={url('/dashboard')}
                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Dashboard
                  </a>
                </>
              ) : (
                <a
                  href={url('/dashboard')}
                  className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                  Dashboard
                </a>
              )}
            </>
          )}

          {!auth && (
            <>
              <a
                href={route('login')}
                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                Log in
              </a>

              {Route.has('register') && (
                <a
                  href={route('register')}
                  className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                  Register
                </a>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;
