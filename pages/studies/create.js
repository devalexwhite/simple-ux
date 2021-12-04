import { PlusCircleIcon, PlusIcon, SaveIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Card } from "../../components/card";
import { SlimStudyLayout } from "../../templates/slimStudyLayout";

const CreateStudy = () => {
  const [studyName, setStudyName] = useState("");
  const [email, setEmail] = useState("");
  const [studyType, setStudyType] = useState("open");
  const [studyCards, setStudyCards] = useState([]);
  const [newCardValue, setNewCardValue] = useState("");

  const addStudyCard = () => {
    if (studyCards.length >= 30) {
      alert("You can only have 30 cards in a study");
      return;
    }

    setStudyCards([...studyCards, newCardValue]);
    setNewCardValue("");
  };

  const removeStudyCard = (value) => {
    setStudyCards(studyCards.filter((card) => card !== value));
  };

  const onCreateStudy = () => {
    if (studyName.trim() === "") {
      alert("Please enter a study name.");
      return;
    }
    if (email.trim() === "") {
      alert("An email is required to send study results to.");
      return;
    }
    if (studyCards.length <= 0) {
      alert("Please enter at least one card.");
      return;
    }
  };

  return (
    <SlimStudyLayout>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {"Basic Information"}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {"Let's start with the fundamentals."}
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {"Study Name"}
                    </label>
                    <input
                      value={studyName}
                      onChange={(e) => setStudyName(e.target.value)}
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Product categories card sort"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {"Email address"}
                      <p className="text-sm text-gray-500">
                        {
                          "At the moment, we do not store results and instead send you each study result via email."
                        }
                      </p>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      placeholder="researcher@company.org"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <fieldset>
                  <div>
                    <legend className="text-base font-medium text-gray-900">
                      Study Type
                    </legend>
                    <p className="text-sm text-gray-500">
                      Choose the type of card sort study you want to create.
                    </p>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="open"
                        value="open"
                        checked={studyType === "open"}
                        onChange={(e) => setStudyType(e.target.value)}
                        name="push-notifications"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor="open"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Open - Participants create their own groups
                      </label>
                    </div>
                    <div className="flex items-center opacity-40">
                      <input
                        value="closed"
                        checked={studyType === "closed"}
                        onChange={(e) => setStudyType(e.target.value)}
                        name="push-notifications"
                        type="radio"
                        disabled={true}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor="push-email"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Closed - COMING SOON
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Cards
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Add the cards you want participants to sort in the study.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  {"Study cards"}
                  <p className="text-sm text-gray-500">
                    {"At the moment, you are limited to 30 cards."}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-5 my-8 w-full">
                  {studyCards.map((card) => (
                    <Card
                      title={card}
                      draggable={false}
                      canDelete={true}
                      onDelete={() => removeStudyCard(card)}
                    />
                  ))}
                </div>
                <div className="max-w-000 mb-4 max-w-xs">
                  <label
                    htmlFor="newcardvalue"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {"Card title"}
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newCardValue}
                    onChange={(e) => setNewCardValue(e.target.value)}
                    id="newcardvalue"
                    placeholder={`Men's sweaters`}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={addStudyCard}
                >
                  <PlusCircleIcon
                    className="mr-2 -ml-1 h-5 w-5"
                    aria-hidden="true"
                  />
                  {"Add card"}
                </button>
              </div>
            </div>
            <div className="my-8 flex justify-end">
              <button
                type="button"
                onClick={onCreateStudy}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create study
              </button>
            </div>
          </div>
        </div>
      </div>
    </SlimStudyLayout>
  );
};

export default CreateStudy;
