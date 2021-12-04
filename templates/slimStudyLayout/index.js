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

const SlimStudyLayout = ({ children, setShowHelp }) => {
  return (
    <div className="min-h-screen bg-gray-100">
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
                </div>
              </div>
            </header>
          </>
        )}
      </Disclosure>
      <div className="py-16 max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

export { SlimStudyLayout };
