import React, { useEffect, useState } from "react";
import "./App.css";
import mockData from "./MOCK_DATA.json";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function App() {
  const [active, setActive] = useState({});
  const [search, setSearch] = useState("");

  const gender = [
    "Male",
    "Female",
    "Bigender",
    "Non-binary",
    "Agender",
    "Polygender",
    "Genderfluid",
    "Genderqueer",
  ];

  const country = ["Brazil", "Thailand", "Sweden", "Japan", "Netherlands"];

  const isActive = Object.keys(active).filter((e) => {
    return active[e];
  });

  const searchResult = () => {
    return mockData.filter((i) => {
      const fullName = i.first_name + " " + i.last_name;
      return search.split("").every((el) => {
        return fullName.split("").includes(el);
      });
    });
  };

  const activeResult = () => {
    return mockData.filter((i) =>
      isActive.every((el) => Object.values(i).includes(el))
    );
  };

  const filtered = search ? searchResult() : activeResult();

  const handleClick = (input) => {
    setActive((previousPicked) => ({
      ...previousPicked,
      [input]: true,
    }));
  };

  const handleClearOne = (input) => {
    setActive((previousPicked) => ({
      ...previousPicked,
      [input]: false,
    }));
  };

  const handleClear = () => {
    setActive((prevState) => {
      const nextState = {};
      Object.keys(prevState).forEach((key) => {
        nextState[key] = false;
      });
      return nextState;
    });
  };

  useEffect(() => {
    console.log(search);
  });

  return (
    <div className="App">
      <h1>Test</h1>
      <Box sx={{ "& button": { mx: 1, my: 4 } }}>
        {gender.map((item, i) => {
          return (
            <Button
              variant={active[item] ? `contained` : `outlined`}
              size="large"
              onClick={() => {
                active[item] ? handleClearOne(item) : handleClick(item);
              }}
              key={i}
            >
              {item}
            </Button>
          );
        })}
      </Box>
      <Box sx={{ "& button": { mx: 1, my: 4 } }}>
        {country.map((item, i) => {
          return (
            <Button
              variant={active[item] ? `contained` : `outlined`}
              size="large"
              onClick={() => {
                active[item] ? handleClearOne(item) : handleClick(item);
              }}
              key={i}
            >
              {item}
            </Button>
          );
        })}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mx: 1, my: 4 }}>
        <TextField
          id="outlined-basic"
          label="Search"
          value={search}
          variant="outlined"
          onChange={(e) => {
            handleClear();
            setSearch(e.target.value);
          }}
        />
        <Button variant="text" onClick={() => handleClear()}>
          Clear
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: 1,
          p: 1,
          m: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {filtered.map((item, i) => {
          return (
            <Card sx={{ width: 0.3, m: 2 }} key={i}>
              <CardMedia
                sx={{ height: "400px" }}
                image={item.image}
                title={`${item.first_name} ${item.last_name}`}
              />
              <CardContent
                sx={{
                  height: "fit-content",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <p className="Name">
                  {item.first_name} {item.last_name}
                </p>
                <p className="CardDetail">{item.gender}</p>
                <p className="CardDetail">{item.email}</p>
                <p className="CardDetail">{item.country}</p>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </div>
  );
}

export default App;
