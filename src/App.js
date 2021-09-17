import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Container, withStyles, Switch } from "@material-ui/core";
import Header from "./components/Header/Header";
import Definitions from "./components/Definitions/Definitions";
import { grey, lightBlue } from "@material-ui/core/colors";

function App() {
  const [word, setword] = useState("");
  const [meaning, setmeanings] = useState([]);
  const [category, setcategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);

  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: grey[500],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setmeanings(data.data);
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(meaning);

  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line
  }, [word, category]);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: lightMode ? "#fff" : "#282c24",
        color: lightMode ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{lightMode ? "Dark" : "Light"} Mode:</span>
          <DarkMode
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>
        <Header
          setword={setword}
          category={category}
          setcategory={setcategory}
          word={word}
          setmeanings={setmeanings}
          lightMode={lightMode}
        />
        {meaning && (
          <Definitions
            category={category}
            word={word}
            meaning={meaning}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
