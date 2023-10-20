import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen" style={{ background: 'linear-gradient(180deg, #4B0082 0%, #000000 100%)' }}>
      <h1 className="text-4xl font-bold mb-8">Packet Planet</h1>
      <div className="flex justify-center">
        <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-6">
          <div className="mb-4">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create Envelope</h5>
            </a>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ fontFamily: 'Roboto' }}>
              Create
            </button>
          </div>
        </div>

        <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-6">
          <div className="mb-4">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Go to Dashboard</h5>
            </a>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ fontFamily: 'Roboto' }}>
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;