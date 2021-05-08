const transactionParentCategories = (user) => {
  const incomeParentCategories = [
    {
      value: 'salary',
      label: 'Salary',
      type: 'income',
    },
    {
      value: 'award',
      label: 'Award',
      type: 'income',
    },
    {
      value: 'selling',
      label: 'Selling',
      type: 'income',
    },
  ].map((categorie) => ({
    ...categorie,
    icon: 'unknown',
    owner: user._id,
  }));

  const expensesParentCategories = [
    {
      value: 'bills_and_utilities',
      label: 'Bills and Utilities',
      type: 'expense',
    },
    {
      value: 'food_and_beverage',
      label: 'Food and Beverage',
      type: 'expense',
    },
    {
      value: 'shopping',
      label: 'Shopping',
      type: 'expense',
    },
    {
      value: 'entertainment',
      label: 'Entertainment',
      type: 'expense',
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
    },
    {
      value: 'phone_bill',
      label: 'Phone bill',
      type: 'expense',
      parent: 'bills_and_utilities',
    },
    {
      value: 'water_bill',
      label: 'Water bill',
      type: 'expense',
      parent: 'bills_and_utilities',
    },
    {
      value: 'electricity_bill',
      label: 'Electricity bill',
      type: 'expense',
      parent: 'bills_and_utilities',
    },
    {
      value: 'restaurants',
      label: 'Restaurants',
      type: 'expense',
      parent: 'food_and_beverage',
    },
    {
      value: 'groceries',
      label: 'Groceries',
      type: 'expense',
      parent: 'shopping',
    },
    {
      value: 'clothing',
      label: 'Clothing',
      type: 'expense',
      parent: 'shopping',
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
      icon: 'unknown',
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
