import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import { ReactSVG } from "react-svg";

const CardSortIntroModal = ({ open, setOpen }) => {
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div>
                <div className="mx-auto max-w-2xl">
                  <ReactSVG
                    src="/illustrations/hello.svg"
                    className="flex w-full justify-center"
                    beforeInjection={(svg) => {
                      svg.setAttribute("style", "width: 400px;height: 200px;");
                    }}
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5 max-w-lg mx-auto">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Welcome!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-base text-gray-500">
                      You've been invited to participate in a research study.
                      This study should take no more than{" "}
                      <strong>10 minutes to complete.</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 max-w-lg mx-auto">
                <button
                  type="button"
                  className="inline-flex justify-center items-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Next
                  <ArrowCircleRightIcon className="ml-2" width={20} />
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { CardSortIntroModal };
