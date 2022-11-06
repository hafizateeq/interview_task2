import { useEffect, useState } from "react";
import "./App.css";
import propertyData1 from "./propertyData.json";
import { useDispatch, useSelector } from "react-redux";
import { propertyData } from "../src/redux/propertySlice";

function App() {
  const [checked, setChecked] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState([]);
  const [selectedProp, setSelectedProp] = useState([]);
  const dispatch = useDispatch();

  const propertyValues = useSelector(
    (state) => state.propertySlice.propertyData[0]
  );

  useEffect(() => {
    dispatch(propertyData(propertyData1));
  }, []);

  console.log(propertyValues, "data");
  // search property type
  const filterData = propertyData1.filter(
    (data) => data.propertyType === checked
  );
  // search from input
  const searchData = () => {
    setSearch(propertyData1.filter((data) => data.address === searchInput));
  };

  // selected properties
  const selectedData = (id) => {
    const selectedArr = [];
    const selectValues = propertyData1.filter((data) => data.id === id);
    selectedArr.push(selectValues && selectValues[0]);
    setSelectedProp((old) => [...old, selectedArr]);
  };
  const handleRemoveData = (ind) => {
    const list = [...selectedProp];
    list.splice(ind, 1);
    setSelectedProp(list);
  };

  const handleChange = (e, ind, id) => {
    if (e.target.checked) {
      selectedData(id);
    } else {
      handleRemoveData(ind);
    }
  };
  return (
    <div className="main">
      <div className="row">
        <div className="col-lg-2">
          <div className="property-type">
            <h5>Property Types</h5>
            <div>
              <p
                className={checked === "All" ? "checked" : ""}
                onClick={() => setChecked("All")}
              >
                All
              </p>
              <p
                className={checked === "Flat" ? "checked" : ""}
                onClick={() => setChecked("Flat")}
              >
                Flat
              </p>
              <p
                className={checked === "Terraced house" ? "checked" : ""}
                onClick={() => setChecked("Terraced house")}
              >
                Terraced house
              </p>
              <p
                className={checked === "Semi-detached" ? "checked" : ""}
                onClick={() => setChecked("Semi-detached")}
              >
                Semi-detached
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-10">
          {/* search box */}
          <label className="form-label">Search</label>
          <div className="search-input">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={() => searchData()}>Search</button>
          </div>
          {/* selected properties */}
          <div className="selected-prop my-4">
            <h5>Selected Properties</h5>
            <div className="my-4">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Address</th>
                    <th scope="col">Postcode</th>
                    <th scope="col">Number of rooms</th>
                    <th scope="col">Floor area {"(m²)"}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProp &&
                    selectedProp.map((item, ind) => (
                      <>
                        <tr key={ind}>
                          <td>{item[0].address}</td>
                          <td>{item[0].postCode}</td>
                          <td>{item[0].numberOfRooms}</td>
                          <td>{item[0].floorArea}</td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* search result */}
          <div className="selected-prop my-4">
            <h5>Search result</h5>
            <div className="my-4">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">✔</th>
                    <th scope="col">Address</th>
                    <th scope="col">Postcode</th>
                    <th scope="col">Property type</th>
                    <th scope="col">Number of rooms</th>
                    <th scope="col">Floor area {"(m²)"}</th>
                  </tr>
                </thead>
                <tbody>
                  {(search.length > 0
                    ? search
                    : checked === "All"
                    ? propertyData1
                    : filterData
                  ).map((item, ind) => (
                    <tr key={ind}>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e) => handleChange(e, ind, item.id)}
                        />
                      </td>
                      <td>{item.address}</td>
                      <td>{item.postCode}</td>
                      <td>{item.propertyType}</td>
                      <td>{item.numberOfRooms}</td>
                      <td>{item.floorArea}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
