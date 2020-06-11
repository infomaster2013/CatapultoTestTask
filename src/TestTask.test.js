import React from 'react';
import ReactDom from 'react-dom';
import {render,cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {jsondata} from "./data";
import TestTask from "./TestTask";

afterEach(cleanup)

it('renders total correctly', function () {
    const {getByTestId} = render(<TestTask data={jsondata}/>)
    expect(getByTestId('total')).toHaveTextContent("Товаров: 10")
});
