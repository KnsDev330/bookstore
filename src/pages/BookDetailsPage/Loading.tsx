import Shimmer from "../../components/components/shimmer";
import Layout from "./Layout";

const Loading = () => {
   return (
      <Layout>
         <div className="flex flex-col gap-4">
            <div className="flex gap-2"><Shimmer /><Shimmer /><Shimmer /></div>
            <div className="flex gap-2"><Shimmer /><Shimmer /><Shimmer /></div>
         </div>
      </Layout>
   );
};

export default Loading;