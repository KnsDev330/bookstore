
const Shimmer = () => {
   return (
      <div className="shimmer-card-container bg-white/40 p-3 rounded-md">
         <div className="shimmer-lines">
            <div className="shimmer-line shimmer-line-long"></div>
            <div className="shimmer-line shimmer-line-short"></div>
            <div className="shimmer-line shimmer-line-medium"></div>
         </div>
         <div className="shimmer-title"></div>
         <div className="shimmer-description"></div>
      </div>
   );
};

export default Shimmer;