import Books from "../components/books/Books";
import NewListing from "../components/shared/NewListing";
import PageLayout from "./PageLayout";

const HomePage = () => {
   return (
      <PageLayout>
         <div className="bg-white w-full text-accent">
            <div className="mcontainer new-listings flex flex-col">
               <NewListing className="mt-10 -mb-5" />
               <Books />
            </div>
         </div>
      </PageLayout>
   )
};

export default HomePage;