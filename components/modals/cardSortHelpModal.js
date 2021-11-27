import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";

const CardSortHelpModal = ({ open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <QuestionMarkCircleIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-left sm:mt-5">
                  <div className="mt-2 max-w-lg mx-auto">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">
                      What should I do?
                    </h2>
                    <p className="text-base text-gray-500">
                      Your task is to group the terms on the board in whatever
                      way makes sense to you. There is no right or wrong answer!
                    </p>
                  </div>
                  <div className="mt-2 max-w-lg mx-auto">
                    <a href="/tutorial/card-sort-groups.gif" target="_blank">
                      <img
                        src="/tutorial/card-sort-groups.gif"
                        alt="Animation demonstrating that you can drag and drop cards on top of each other to create a group"
                        className="rounded-md shadow-xl ring-1 ring-black ring-opacity-5 w-full my-8 "
                      />
                    </a>
                    <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">
                      How do I do that?
                    </h2>
                    <p className="text-base text-gray-500">
                      Drag and drop similiar cards on top of each other to group
                      them. Click the title to name your group.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center items-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Got it!
                  <CheckCircleIcon className="ml-2" width={20} />
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { CardSortHelpModal };
