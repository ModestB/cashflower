import React from 'react';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import CheckroomRoundedIcon from '@mui/icons-material/CheckroomRounded';

export const categoriesIconsHandler = (id, color) => {
  const categoryIconStyles = {
    fontSize: 24,
    color,
  };

  switch (id) {
    case 'awardRoundedIcon': // Award
      return <StarRateRoundedIcon sx={categoryIconStyles} />;

    case 'foodAndBeverageRoundedIcon': // Food and Beverage
      return <FastfoodRoundedIcon sx={categoryIconStyles} />;

    case 'entertainmentRoundedIcon': // Entertainment
      return <LiveTvRoundedIcon sx={categoryIconStyles} />;

    case 'sellRoundedIcon': // Sell
      return <SellRoundedIcon sx={categoryIconStyles} />;

    case 'billsAndUtilitiesRoundedIcon': // Bills and Utilities
    case 'tvBillRoundedIcon': // Television bill
    case 'phoneBillRoundedIcon': // Phone bill
    case 'waterBillRoundedIcon': // Water bill
    case 'elektricityBillRoundedIcon': // Electricity bill
      return <ReceiptRoundedIcon sx={categoryIconStyles} />;

    case 'salaryRoundedIcon': // Salary
      return <MonetizationOnRoundedIcon sx={categoryIconStyles} />;

    case 'shoppingRoundedIcon': // Shopping
      return <ShoppingCartRoundedIcon sx={categoryIconStyles} />;

    case 'restaurantsRoundedIcon': // Restaurants
      return <RestaurantRoundedIcon sx={categoryIconStyles} />;

    case 'groceriesRoundedIcon': // Groceries
      return <LocalGroceryStoreRoundedIcon sx={categoryIconStyles} />;

    case 'clothingRoundedIcon': // Clothing
      return <CheckroomRoundedIcon sx={categoryIconStyles} />;

    default:
      break;
  }
  return null;
};

export default categoriesIconsHandler;
