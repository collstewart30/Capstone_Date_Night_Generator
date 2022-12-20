const DisplayFavorites = ({ nps }) => {
  return (
    <div>
      <li>{nps.title}</li>
      <li>{nps.park_name}</li>
    </div>
  );
};

export default DisplayFavorites;
