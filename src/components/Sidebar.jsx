import React from 'react';
import { Stack } from '@mui/material';

import { categories } from '../utils/constants';

const selectedCategory = "New";

const Sidebar = () => {
  return (
    <Stack direction="row" sx={{ overflowY: 'auto', height: { sx: 'auto', md: '95%' }, flexDirection: { md: 'column' } }}>
        {/* map over categories */}
        {categories.map((category) => (
            <button className='category-btn' style={{ background: category.name === selectedCategory && '#e1592e', color: 'white' }} 
            key={category.name}>
                <span style={{ color: category.name === selectedCategory? 'white': '#e1592e', marginRight: '15px'  }}>{category.icon}</span>
                <span style={{ opacity: category.name === selectedCategory? '1': '0.7' }}>{category.name}</span>
            </button>
        ))}
    </Stack>
  )
}

export default Sidebar