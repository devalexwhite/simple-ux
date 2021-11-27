/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  PlusSmIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ReactSVG } from "react-svg";

const StudyLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-hidden relative max-h-screen">
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <header>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <ReactSVG
                        aria-label="SimpleUX logo with a square and triangle icon"
                        src="/logo.svg"
                        className="text-indigo-600 w-60"
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <QuestionMarkCircleIcon width={18} className="mr-2" />
                      What should I do?
                    </button>
                  </div>
                </div>
              </div>
            </header>
          </>
        )}
      </Disclosure>
      <div className="flex-1 flex flex-col pt-16 max-h-full">{children}</div>
    </div>
  );
};

export { StudyLayout };
