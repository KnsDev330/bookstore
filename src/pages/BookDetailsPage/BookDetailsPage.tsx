import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetBookByIdQuery } from "../../redux/api/bookApi";
import ErrorBox from "../../components/shared/ErrorBox";
import { getErrors } from "../../utils/Utils";
import Loading from "./Loading";
import Layout from "./Layout";

const BookDetailsPage = () => {
   const { id } = useParams();
   useEffect(() => console.log('id', id), [id]);

   const { data, isFetching, isError, isSuccess, error } = useGetBookByIdQuery({ id: id! }, { refetchOnMountOrArgChange: false, refetchOnFocus: true })

   if (isFetching) return <Loading />;
   if (isError) return <Layout><ErrorBox error={getErrors(error)} /></Layout>;
   if (!isSuccess) return <Layout><ErrorBox error="Could not load data from server" /></Layout>;

   return (
      <Layout>
         <div className="flex flex-col md:flex-row gap-5">
            <div className="w-[40%] p-4 border rounded-xl ">
               <div className="book-img overflow-hidden aspect-[4/5]">
                  <img src={data.data.image} alt={data.data.title} className="hover:scale-110 duration-300" />
               </div>
            </div>
            <div className="w-[60%] p-4 border rounded-xl">
               <p className="bg-green-100 text-green-300 inline-block px-2">{data.data.genre}</p>
            </div>
         </div>
      </Layout>
   );
};

export default BookDetailsPage;