import Card from "../../components/Card/Card";
import useLaptops from "../../hooks/useLaptops";

const Laptop = () => {
  const [laptops] = useLaptops();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container m-auto  justify-items-center my-10 gap-y-10">
      {laptops?.map((laptop) => (
        <Card key={laptop?._id} laptop={laptop} />
      ))}
    </div>
  );
};

export default Laptop;
