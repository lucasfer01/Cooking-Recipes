import { render, screen } from '@testing-library/react';
// import {App} from './App';

import React from "react";
import { Link } from "react-router-dom";
// import { configure, shallow } from "enzyme";
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import isReact from "is-react";

import AppContainer from "./components/AppContainer";

// configure({ adapter: new Adapter() });


  // let AppContainer;
  
  beforeEach(() => {
    render(<AppContainer />);
    
  });

  test('Debería renderizar dos <Link to="" />. El primero que vaya a "/", y el segundo a "/house/create"', () => {

    expect(AppContainer.find(Link).length).toBeGreaterThanOrEqual(2);
  });

  
