import Books from "../components/books/Books";
import PageLayout from "./PageLayout";

const HomePage = () => {
   return (
      <PageLayout>
         <div className="bg-white w-full text-accent">
            <div className="mcontainer new-listings flex gap-5 flex-col md:flex-row">
               <Books />
            </div>
         </div>
      </PageLayout>
   )
};

export default HomePage;