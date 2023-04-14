//utils
import React from "react";
import { Route, Routes } from "react-router-dom";

//components
import SliderOutlet from "../../components/SliderOutlet";
import Nav from "../../components/nav/Nav";
import MessagesTab from "./tabs/MessagesTab";
import DashboardTab from "./tabs/DashboardTab";

//styles
import {
  Card,
  Container,
  LeftColumn,
  RightColumn,
  Wrapper,
} from "./home.styles";

const Home = () => {
  return (
    <Wrapper>
      <Container>
        <Card>
          <LeftColumn className="navbar">
            <Nav />
          </LeftColumn>
          <RightColumn>
            <Routes>
              <Route element={<SliderOutlet />}>
                <Route path="" element={<DashboardTab />} />
                <Route path="message" element={<MessagesTab />} />
                <Route path="contact" element={<h1>contact</h1>} />

                {/* catch all routes */}
                <Route exact path="*" element={<h1>Wrong address</h1>} />
              </Route>
            </Routes>
          </RightColumn>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default Home;
