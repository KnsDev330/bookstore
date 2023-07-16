import Books from "../Components/Books/Books";

const BooksPage = () => {
   return (
      <div className="bg-white w-full text-accent">
         <div className="mcontainer new-listings flex gap-5 flex-col md:flex-row">
            <Books />
         </div>
      </div>
   )
};

export default BooksPage;