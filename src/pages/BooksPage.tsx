import Books from "../components/books/Books";
import AllBooks from "../components/shared/AllBooks";
import PageLayout from "./PageLayout";

const BooksPage = () => {
   return (
      <PageLayout>
         <div className="bg-white w-full text-accent">
            <div className="mcontainer new-listings flex flex-col">
               <AllBooks className="mt-10 -mb-5" />
               <Books />
            </div>
         </div>
      </PageLayout>
   )
};

export default BooksPage;