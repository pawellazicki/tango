import React from "react";
import chroma from "chroma-js";

import Select from "react-select";

export const colourOptions = [
  { value: "blue", label: "Blue", color: "#0052CC", key: "b" },
  { value: "purple", label: "Purple", color: "#5243AA", key: "p" },
  { value: "red", label: "Red", color: "#FF5630", key: "r" },
  { value: "orange", label: "Orange", color: "#FF8B00", key: "o" },
  { value: "yellow", label: "Yellow", color: "#FFC400", key: "y" },
  { value: "green", label: "Green", color: "#36B37E", key: "g" },
];

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

export default ({ onColorChange, value }) => (
  <Select
    closeMenuOnSelect={false}
    defaultValue={value}
    isMulti
    options={colourOptions}
    styles={colourStyles}
    onChange={onColorChange}
  />
);
