import ProfileSelector from "./components/ProfileSelector";
import CreateEventForm from "./components/CreateEventForm";
import EventList from "./components/EventList";

function HomePage() {
  return (
    <div className="flex flex-col bg-blue-100">
      <header className="flex flex-col md:flex-row justify-items-start py-4 px-2 sm:px-4 md:px-20 md:justify-between items-center transition-all">
        <div className="app-title">
          <h2 className="font-bold text-2xl">Event Management</h2>
          <span className="font-light text-sm">
            Manage events across profiles and timezones
          </span>
        </div>

        <div className="flex items-center">
          <ProfileSelector />
        </div>
      </header>


      <main className="flex sm:flex-row flex-col gap-3 py-4 px-2 sm:px-4 md:px-20 w-full flex-1">
        <section className="sm:w-1/2 w-full max-h-[410px] flex-1">
          <CreateEventForm />
        </section>

        <section className="sm:w-1/2 w-full max-h-[410px] flex-1">
          <EventList />
        </section>
      </main>
    </div>
  );
}

export default HomePage;