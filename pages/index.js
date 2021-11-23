import Head from "next/head";
import Image from "next/image";
import { Modal } from "../components/modal";

export default function Home() {
  return (
    <div className="prose container mx-auto my-16 px-4">
      <Head>
        <title>SimpleUX - Simple, bloat-free UX tools</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta
          name="description"
          content="SimpleUX empowers UX professionals through a suite of bullshit-free tools and educational resources that are available at whatever price point you can afford."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div className="w-full  mb-16">
          <img src="/logo.png" width="300" />
        </div>
        <h1>{"Simple, bloat-free UX tools"}</h1>
        <span>
          {
            "SimpleUX empowers UX professionals through a suite of bullshit-free tools and educational resources that are available at whatever price point you can afford. We operate transparently and our products are open-source."
          }
        </span>
      </header>
      <article>
        <h2>{"SimpleUX is right around the corner"}</h2>
        <p>
          {
            "We're not quite ready yet, but we've got a lot of exciting things in the oven. Until then, check out some of these links:"
          }
        </p>
        <ul>
          <li>
            <a
              href="https://world.hey.com/alex.white"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              {"News and announcements"}
            </a>
          </li>
          <li>
            <a
              href="https://github.com/devalexwhite/simple-ux"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              {"SimpleUX on GitHub"}
            </a>
          </li>
        </ul>
        <h2>{"Sponsor SimpleUX"}</h2>
        <p>
          {
            "SimpleUX is built 100% in the open and supported entirely by our sponsors. Sponsoring SimleUX helps us pay infrastructure costs and continue to develop the tools SimpleUX offers."
          }
        </p>
        <iframe
          src="https://github.com/sponsors/devalexwhite/card"
          title="Sponsor devalexwhite"
          height="170"
          width="600"
          className="border-0"
        ></iframe>
        <h2>{"Questions or feedback?"}</h2>
        <p>
          {"We're very open to any feedback or questions. "}
          <a href="mailto:alex.white@hey.com">Click here</a>
          {
            " to send us an email and we'll get back to you within a couple of days."
          }
        </p>
      </article>
    </div>
  );
}
