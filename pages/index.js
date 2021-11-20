import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="prose container mx-auto my-16 px-4">
      <header>
        <h1>{"Simple, bloat-free UX tools"}</h1>
        <span>
          {
            "SimpleUX empowers UX professionals through a suite of bullshit-free tools and educational resources that are available at whatever price point you can afford."
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
              href="https://world.hey.com/alex.white/something-exciting-is-coming-062a1588"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              {"SimpleUX announcement letter"}
            </a>
          </li>
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
