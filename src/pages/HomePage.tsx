import Books from "../components/books/Books";
import Layout from "./Layout";

const HomePage = () => {
   return (
      <Layout>
         <div className="bg-white w-full text-accent">
            <div className="mcontainer new-listings flex gap-5 flex-col md:flex-row">
               <Books />
            </div>
         </div>
      </Layout>
   )
};

export default HomePage;