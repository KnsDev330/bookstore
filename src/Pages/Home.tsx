import BestSellers from "../Components/Home/BestSellers";
import MostViewed from "../Components/Home/MostViewed";

const Home = () => {
   return (
      <>
         <div className="bg-white w-full text-accent">
            <div className="mcontainer flex gap-5 flex-col md:flex-row">
               <div className="best-sellers basis-2/3">
                  <BestSellers />
               </div>
               <div className="most-viewed basis-1/3">
                  <MostViewed />
               </div>
            </div>
         </div>
      </>
   )
};

export default Home;