import { TextField, InputAdornment } from "@mui/material";
import React from "react";

export default function NumberField(props) {
  const { label, onChange, value, adornment, ...otherProps } = props;
  return (
    <TextField
      type="number"
      fullWidth
      onWheel={(e) => {
        e.target.blur();
      }}
      value={value}
      label={label}
      onChange={onChange}
      InputProps={{
        endAdornment: <InputAdornment position="end">{adornment || ''}</InputAdornment>,

      }}

      {...otherProps}
    />
  );
  // inputProps: {
  //   min: 0,
  // }  这个属性有bug，加了就不能输入小数点了
}
