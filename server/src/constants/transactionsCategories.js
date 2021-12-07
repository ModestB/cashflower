const transactionParentCategories = (user) => {
  const incomeParentCategories = [
    {
      value: 'salary',
      label: 'Salary',
      type: 'income',
      icon: 'salaryRoundedIcon',
    },
    {
      value: 'award',
      label: 'Award',
      type: 'income',
      icon: 'awardRoundedIcon',
    },
    {
      value: 'selling',
      label: 'Selling',
      type: 'income',
      icon: 'sellRoundedIcon',
    },
  ].map((categorie) => ({
    ...categorie,
    owner: user._id,
  }));

  const expensesParentCategories = [
    {
      value: 'bills_and_utilities',
      label: 'Bills and Utilities',
      type: 'expense',
      icon: 'billsAndUtilitiesRoundedIcon',
    },
    {
      value: 'food_and_beverage',
      label: 'Food and Beverage',
      type: 'expense',
      icon: 'foodAndBeverageRoundedIcon',
    },
    {
      value: 'shopping',
      label: 'Shopping',
      type: 'expense',
      icon: 'shoppingRoundedIcon',
    },
    {
      value: 'entertainment',
      label: 'Entertainment',
      type: 'expense',
      icon: 'entertainmentRoundedIcon',
    },
  ].map((categorie) => ({
    ...categorie,
    icon: 'unknown',
    owner: user._id,
  }));

  return [...incomeParentCategories, ...expensesParentCategories];
};

const transactionChildCategories = (user, parentCategories) => {
  const expenseChildCategories = [
    {
      value: 'television_bill',
      label: 'Television bill',
      type: 'expense',
      parent: 'bills_and_utilities',
      icon: 'tvBillRoundedIcon',
    },
    {
      value: 'phone_bill',
      label: 'Phone bill',
      type: 'expense',
      parent: 'bills_and_utilities',
      icon: 'phoneBillRoundedIcon',
    },
    {
      value: 'water_bill',
      label: 'Water bill',
      type: 'expense',
      parent: 'bills_and_utilities',
      icon: 'waterBillRoundedIcon',
    },
    {
      value: 'electricity_bill',
      label: 'Electricity bill',
      type: 'expense',
      parent: 'bills_and_utilities',
      icon: 'elektricityBillRoundedIcon',
    },
    {
      value: 'restaurants',
      label: 'Restaurants',
      type: 'expense',
      parent: 'food_and_beverage',
      icon: 'restaurantsRoundedIcon',
    },
    {
      value: 'groceries',
      label: 'Groceries',
      type: 'expense',
      parent: 'shopping',
      icon: 'shoppingRoundedIcon',
    },
    {
      value: 'clothing',
      label: 'Clothing',
      type: 'expense',
      parent: 'shopping',
      icon: 'clothingRoundedIcon',
    },
  ].map((categorie) => {
    const parent = parentCategories.find((cat) => {
      if (cat.value === categorie.parent) {
        return cat._id;
      }
      return null;
    });

    return {
      ...categorie,
      owner: user._id,
      parentId: parent ? parent._id : null,
    };
  });
  return expenseChildCategories;
};

module.exports = {
  transactionParentCategories,
  transactionChildCategories,
};
