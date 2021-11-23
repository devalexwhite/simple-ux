import { useState } from "react";
import { ReactSVG } from "react-svg";
import { FeaturesRow } from "../components/featuresRow";
import { Footer } from "../components/footer";
import { SubscribedModal } from "../components/modals/subscribedModal";

const Home = () => {
  const [email, setEmail] = useState("");
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [disableEmailButton, setDisableEmailButton] = useState(false);
  const features = [
    {
      name: "Pay what you want",
      text: "You choose what our products are worth to you.",
    },
    {
      name: "Detailed analytics",
      text: "All of our products provide analytical tools to help you understand your users.",
    },
    {
      name: "Made for real people",
      text: "Your users will love using our tools to participate in studies.",
    },
    {
      name: "Seriously simple",
      text: "We don't believe in complexity for the sake of it. ",
    },
    {
      name: "Open source",
      text: "We build in the open and are fully transparent.",
    },
    {
      name: "Let us teach you",
      text: "Visit our YouTube channel and blog for free educational resources.",
    },
  ];

  const submitEmail = () => {
    setDisableEmailButton(true);
    try {
      fetch("/api/capture-email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }).then((res) => {
        if (res.status !== 200)
          alert(
            "An error has occurred, please try check your email address and try again."
          );
        else setEmailModalOpen(true);
      });
    } catch (e) {
      alert(
        "An error has occurred, please try check your email address and try again."
      );
    } finally {
      setDisableEmailButton(false);
    }
  };

  return (
    <div className="bg-white pb-8 sm:pb-12 lg:pb-12">
      <SubscribedModal open={emailModalOpen} setOpen={setEmailModalOpen} />
      <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
          <div>
            <div>
              <ReactSVG
                aria-label="SimpleUX logo with a square and triangle icon"
                src="/logo.svg"
                className="text-indigo-600 w-60"
              />
            </div>
            <div className="mt-20">
              <div className="mt-6 sm:max-w-xl">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  {"UX tools for any size team"}
                </h1>
                <p className="mt-6 text-xl text-gray-500">
                  Pay what you want for easy-to-use UX tools and educational
                  resources. <strong>Coming soon.</strong>
                </p>
              </div>
              <form action="#" className="mt-12 sm:max-w-lg sm:w-full sm:flex">
                <div className="min-w-0 flex-1">
                  <label htmlFor="hero-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="hero-email"
                    type="email"
                    className="block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <button
                    disabled={disableEmailButton}
                    onClick={submitEmail}
                    type="submit"
                    className={`block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-600 text-base font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-10 ${
                      disableEmailButton && "pointer-not-allowed opacity-20"
                    }`}
                  >
                    Notify me
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
          <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="hidden sm:block">
              <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
              <svg
                className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={392}
                  fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                />
              </svg>
            </div>
            <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0  lg:max-w-none lg:h-full lg:pl-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5  lg:h-full lg:w-auto lg:max-w-none"
                src="/card-sort-screenshot.png"
                alt="Screenshot of the card sorting tool created by SimpleUX"
              />
            </div>
          </div>
        </div>
      </div>
      <FeaturesRow features={features} />
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
