import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

export default function ToggleComponents() {
    const [type, setType] = useState<string>('price');
    console.log(type)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1.5rem",
      }}
    >
      <ToggleButtonGroup
        // value={priceType}
        exclusive
        onChange={(e) => {
        //   handlePriceTypeChange(e);
        setType(e.target.value);
        }}
        sx={{
          "&.Mui-selected": {
            color: "red !important",
            backgroundColor: 'red',
          },
          borderColor: "gold",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid gold !important",
            borderColor: "unset",
            color: "gold !important ",
            backgroundColor: 'red',
          },
          "& .MuiToggleButton-standard": {
            color: "gold !important",
            backgroundColor: 'transparent',
          },
        }}
      >
        <ToggleButton value="prices">Prices</ToggleButton>
        <ToggleButton value="market_caps">Market Cap</ToggleButton>
        <ToggleButton value="total_volumes">Total Volume</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}