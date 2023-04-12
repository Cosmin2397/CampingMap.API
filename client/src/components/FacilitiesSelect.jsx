import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const facilities = [
  'Facility 1',
  'Facility 2',
  'Facility 3',
  'Facility 4',
  'Facility 5',
];

function getStyles(facility, campingFacility, theme) {
  return {
    fontWeight:
    campingFacility.indexOf(facility) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function FacilitiesSelect({ campingFacilities, setCampingFacilities }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCampingFacilities(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="camping-facilities-label">Camping facilities</InputLabel>
        <Select
          labelId="camping-facilities-label"
          id="camping-facilities"
          multiple
          value={campingFacilities}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Camping facilities" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {facilities.map((facility) => (
            <MenuItem
              key={facility}
              value={facility}
              style={getStyles(facility, campingFacilities, theme)}
            >
              {facility}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}