import {BsCaretDown} from "react-icons/bs";
import { transformFormat } from "../../services/func/transformFunc";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const actualValues = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90];

const marks = actualValues.map((value, index) => ({
  value: (index / (actualValues.length - 1)) * 100, // فاصله یکنواخت از 0 تا 100
  label: transformFormat(value),
}));

function valueText(value) {
  return `${value}°C`;
}

export default function ProgressBar({ getValue }) {
  const handleSliderChange = (event, newValue) => {
    const closestIndex = Math.round(newValue / (100 / (actualValues.length - 1)));
    const selectedValue = actualValues[closestIndex] || actualValues[0];

    getValue(selectedValue);
    console.log("Selected Value:", selectedValue);
  };

  return (
    <div className="w-[90%] h-16 mt-4 mx-auto">
      <Box sx={{ width: 360 }}>
        <Slider
          aria-label="Always visible"
          defaultValue={0}
          getAriaValueText={valueText}
          step={null} // ❗️ اجازه دهید کاربر هر مقداری را انتخاب کند
          marks={marks}
          valueLabelDisplay="on"
          valueLabelFormat={(value) => <BsCaretDown size={24} />}
          min={0}
          max={100}
          sx={{
            color: 'success.main',
            height: 8,
            '& .MuiSlider-track': {
              border: 'none',
            },
            '& .MuiSlider-rail': {
              opacity: 0.3,
              backgroundColor: 'grey.400',
            },
            '& .MuiSlider-thumb': {
              width: '10px',
              height: '10px',
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: '#0000',
              height: '22px',
              width: '28px',
              color: 'black',
              transform: 'translateY(-50%) rotate(0deg)',
              fontSize: '0.75rem',
              '& *': {
                background: 'transparent',
              },
            },
          }}
          onChange={handleSliderChange}
        />
      </Box>
    </div>
  );
}
