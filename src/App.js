import React, { useState, useEffect } from "react";
import Image1 from "../src/octopus.png";
import "./App.css";
import { Navbar, Container } from "react-bootstrap";
import Cards from "./Cards";

function App() {
  const [program, setProgram] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [visible, setVisible] = useState(16);

  //Fetching the data
  useEffect(() => {
    (async () => {
      let programData;
      try {
        const respone = await fetch(
          "https://iitm1blt3l.execute-api.ap-southeast-1.amazonaws.com/dev/hosted-events?limit=100"
        );
        programData = await respone.json();
      } catch (error) {
        console.log(error);
        programData = [];
      }
      setProgram(programData.events);
      setSearchData(programData.events);
    })();
  }, []);

  //Handling the searchbar
  const searchHandler = (e) => {
    if (e.target.value === "") {
      setProgram(searchData);
    } else {
      const filterResult = searchData.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (filterResult.length > 0) {
        setProgram(filterResult);
      } else {
        setProgram([{ name: "No events found" }]);
      }
    }
    setSearchTerm(e.target.value);
  };

  //Handling loadmore button
  const handleMore = () => {
    setVisible(visible + 12);
  };

  return (
    <div className="App">
      <div className="main-container">
        {/* Navbar starts here */}
        <div className="navbar">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  alt="Konfhub-logo"
                  src="https://www.konfhub.com/img/logo.svg"
                  width="150"
                  height="75"
                  className="d-inline-block align-top logo"
                />
              </Navbar.Brand>
            </Container>
          </Navbar>
        </div>
        {/* Navbar ends here */}
        <div className="description-box">
          <>
            {/* Description card starts here */}
            <div className="description-content">
              <h2 style={{ fontFamily: "cursive", color: "rgb(26, 0, 26)" }}>
                Events
              </h2>
              <p
                style={{
                  marginLeft: "50px",
                  width: "80%",
                  maxHeight: "50%",
                  fontFamily: "sans-serif",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </>
          <div className="image1">
            <img src={Image1} alt="octopus" width="300px" height="250px" />
          </div>
        </div>
        {/* Description card ends here */}

        {/* Search-bar starts here */}
        <div className="main-search">
          <div className="search-bar">
            <h5>Search</h5>
            <input
              className="search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={searchHandler}
            />
          </div>
          <div className="past-events">
            <h5>Past Events</h5>

            <select name="pastevents" className="past">
              <option value="">--Select type--</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
        {/* Search-bar starts here */}

        {/* Cards starts here */}
        <div className="original-conatiner">
          <h2>250+ Events</h2>
          <div className="main-cards-container">
            <div className="card-space">
              {program.slice(0, visible).map((programs, index) => (
                <Cards programData={programs} key={index} />
              ))}
            </div>
          </div>
        </div>
        {/* Cards starts here */}

        {/* Loadmore starts here */}
        <div className="loadmore">
          {visible < program.length && (
            <button onClick={handleMore}>Load more</button>
          )}
        </div>
        {/* Loadmore starts here */}
      </div>
    </div>
  );
}

export default App;
