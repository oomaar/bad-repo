import noDataImg from "../img/no-data.png";

export const NoData = () => {
  return (
    <div className="white-box m-0">
      <div className="noData">
        <div className="align-middle">
          <i>
            <img src={noDataImg} alt="" />
          </i>
          <p>No Data Found !</p>
        </div>
      </div>
    </div>
  );
};
