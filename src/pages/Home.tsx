import BookReviewList from "../components/BookReviewList";

const Home = () => {

  return (
    <main className="flex min-h-full flex-col px-6 py-12 lg:px-8">
      <h1 className=" text-center text-4xl text-gray-900">Book Reviews</h1>
      <div className='mt-10'>
        <BookReviewList />
      </div>
    </main>
  );
};

export default Home;
