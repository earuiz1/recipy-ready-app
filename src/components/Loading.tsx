import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ReactLoading type="bars" color="#fff" height={100} width={100} />
    </div>
  );
};

export default Loading;
