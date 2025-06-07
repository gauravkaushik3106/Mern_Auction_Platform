import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We prioritize honesty and transparency in every transaction, ensuring a fair and ethical auction experience for all.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We continuously evolve our platform with the latest technology to deliver a seamless and efficient bidding process.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We cultivate a thriving community of buyers and sellers passionate about discovering and offering unique items.",
    },
    {
      id: 4,
      title: "Customer Focus",
      description:
        "We are committed to providing outstanding support and resources to help users navigate auctions with confidence.",
    },
  ];

  return (
    <section className="w-full ml-0 px-5 pt-20 lg:pl-[320px] gap-10 flex flex-col min-h-screen py-4 justify-center bg-teal-50">
      <div>
        <h1 className="text-teal-600 text-3xl font-extrabold mb-4 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Welcome to <span className="font-semibold text-teal-700">SuhBidz</span> —
          your premier destination for online auctions and dynamic bidding.
          Established in 2025 by <strong>Banshikha and Gaurav</strong>, our platform
          empowers buyers and sellers to connect and transact securely in a
          seamless digital environment.
        </p>
      </div>

      <div>
        <h3 className="text-gray-900 text-xl font-semibold mb-2 md:text-2xl lg:text-3xl">
          Our Mission
        </h3>
        <p className="text-lg md:text-xl text-gray-700">
          At <strong>SuhBidz</strong>, our mission is to redefine the online auction
          experience. We aim to create an engaging and trustworthy marketplace
          that enables individuals and businesses to discover rare finds,
          participate in transparent bidding, and enjoy the excitement of every
          win.
        </p>
      </div>

      <div>
        <h3 className="text-gray-900 text-xl font-semibold mb-2 md:text-2xl lg:text-3xl">
          Our Values
        </h3>
        <ul className="list-inside list-disc space-y-2 pl-4 text-gray-700 text-lg md:text-xl">
          {values.map((element) => (
            <li key={element.id}>
              <span className="font-bold text-teal-700">{element.title}</span>:{" "}
              {element.description}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-gray-900 text-xl font-semibold mb-2 md:text-2xl lg:text-3xl">
          Our Story
        </h3>
        <p className="text-lg md:text-xl text-gray-700">
          <strong>SuhBidz</strong> was founded by <strong>Banshikha and Gaurav</strong> — two
          passionate developers with a vision to connect people through
          meaningful auctions. Backed by technical expertise and a commitment to
          user satisfaction, our platform offers a superior auction experience
          to users across the globe.
        </p>
      </div>

      <div>
        <h3 className="text-gray-900 text-xl font-semibold mb-2 md:text-2xl lg:text-3xl">
          Join Us
        </h3>
        <p className="text-lg md:text-xl text-gray-700">
          Whether you're here to buy, sell, or explore, <strong>SuhBidz</strong> welcomes
          you to a growing community of auction enthusiasts. Uncover rare
          opportunities, connect with other bidders, and experience the thrill
          of winning — all in one place.
        </p>
      </div>

      <div>
        <p className="text-teal-600 text-xl font-bold mb-3">
          Thank you for choosing <strong>SuhBidz</strong>. We look forward to being a
          part of your auction journey.
        </p>
      </div>
    </section>
  );
};

export default About;
