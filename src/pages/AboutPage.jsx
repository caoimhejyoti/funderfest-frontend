function AboutPage() {
  return (
    <main className="container  bg-pink-600 py-6 rounded-lg">
      <h1 className="text-3xl font-bold text-orange-200">
        All about FunderFest Events
      </h1>
      <section className="bg-violet-400 my-3 p-3 rounded-lg">
        <h2 className="text-xl font-bold ">What is FunderFest Events?</h2>
        <p>
          FunderFest Events was created to provide a platform for event creators
          to be able to host their events and gage the response. Users can
          create events, let their audience know the event details, sell tickets
          with the knowledge that the event is not a guarenteed until closer to
          the event. Think of this as the kickstarter for events.
        </p>
      </section>
      <section className="bg-orange-400 my-3 p-3 rounded-lg">
        <h2 className="text-xl font-bold ">Why FunderFest Events?</h2>
        <p>
          The name FunderFest Events comes from the idea of fundraising, having
          fun and going back to the events of our youth!
        </p>
      </section>
      <section className="bg-violet-400 my-3 p-3 rounded-lg">
        <h2 className="text-xl font-bold ">
          FunderFest Events and She Codes Plus Program
        </h2>
        <p>
          This crowdfunding platform was created as paert of the She Codes Plus
          Progam, by Caoimhe Young. Please note as this was created as part of a
          project, no financial transactions are possible.
        </p>
      </section>
    </main>
  );
}

export default AboutPage;
