import NewListings from "../Components/Home/NewListings";

const HomePage = () => {
   return (
      <>
         <div className="bg-white w-full text-accent">
            <div className="mcontainer new-listings flex gap-5 flex-col md:flex-row">
               <NewListings />
            </div>
         </div>
      </>
   )
};

export default HomePage;