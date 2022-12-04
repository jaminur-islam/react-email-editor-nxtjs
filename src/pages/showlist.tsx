import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const ShowTemplated = dynamic(() => import("../components/ShowTemplated"), {
  ssr: false,
});
export default function showlist() {
  const allTemplated = useSelector((state: any) => state?.emailTemplatedList?.emailTemplatedList);
  return (
    <>
      <h1>show list of templated </h1>

      {allTemplated.map((allTep, index) => {
        return <ShowTemplated key={index} html={allTep.html} design={allTep.design} />;
      })}
    </>
  );
}
