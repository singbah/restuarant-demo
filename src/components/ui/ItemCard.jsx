export default function ItemCard({
  name,
  price,
  photo,
  onPress,
  lable,
  type_,
}) {
  return (
    <div className="flex flex-col mx-2 overflow-y-auto p-2">
      <div className="flex relative items-center rounded  shadow active:shadow-lg hover:shadow-lg transition p-0.5">
        <img
          src={photo}
          className={
            type_ === "item"
              ? "border border-gray-400 h-12 w-20 rounded mr-4"
              : "border border-gray-400 h-12 w-12 rounded-full mr-4"
          }
          alt="photo"
        />
        <section className="mr-2">
          <p className="text-lg font-bold">{name}</p>
          <p className="text-sm text-gray-600">{price}</p>
        </section>
        <button
          className={
            lable.toLowerCase() === "delete"
              ? "bg-red-400 px-4  absolute right-0 mr-2  rounded-2xl text-white font-bold shadow-lg"
              : "bg-green-400 px-4  absolute right-0 mr-2  rounded-2xl text-white font-bold shadow-lg"
          }
          onClick={onPress}
        >
          {lable}
        </button>
      </div>
    </div>
  );
}
