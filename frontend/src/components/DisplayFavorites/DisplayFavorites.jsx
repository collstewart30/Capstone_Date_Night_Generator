const DisplayFavorites = ({ data }) => {
  return (
    <div>
      <p>{data.title}</p>
      <p>{data.park_name}</p>
    </div>
  );
};

export default DisplayFavorites;
