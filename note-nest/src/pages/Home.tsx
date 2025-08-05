import NoteForm from "@/components/NoteForm";
import NoteList from "@/components/NoteList";
const Home = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="flex items-center justify-center px-4 py-8 bg-gray-50 max-w-screen-sm mx-auto w-full rounded">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            📝 Note Nest
          </h1>
          <div className="rounded-lg p-6 bg-white shadow">
            <NoteForm />
          </div>
          <NoteList />
        </div>
      </div>
    </div>
  );
};

export default Home;
