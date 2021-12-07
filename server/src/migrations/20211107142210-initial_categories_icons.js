module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('categories').updateMany(
      { value: 'award', icon: 'unknown' },
      { $set: { icon: 'awardRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'salary', icon: 'unknown' },
      { $set: { icon: 'salaryRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'selling', icon: 'unknown' },
      { $set: { icon: 'sellRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'bills_and_utilities', icon: 'unknown' },
      { $set: { icon: 'billsAndUtilitiesRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'food_and_beverage', icon: 'unknown' },
      { $set: { icon: 'foodAndBeverageRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'shopping', icon: 'unknown' },
      { $set: { icon: 'shoppingRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'entertainment', icon: 'unknown' },
      { $set: { icon: 'entertainmentRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'television_bill', icon: 'unknown' },
      { $set: { icon: 'tvBillRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'phone_bill', icon: 'unknown' },
      { $set: { icon: 'phoneBillRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'water_bill', icon: 'unknown' },
      { $set: { icon: 'waterBillRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'electricity_bill', icon: 'unknown' },
      { $set: { icon: 'elektricityBillRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'restaurants', icon: 'unknown' },
      { $set: { icon: 'restaurantsRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'groceries', icon: 'unknown' },
      { $set: { icon: 'shoppingRoundedIcon' }}
    );
    await db.collection('categories').updateMany(
      { value: 'clothing', icon: 'unknown' },
      { $set: { icon: 'clothingRoundedIcon' }}
    );
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('categories').updateMany(
      { value: 'award', icon: 'awardRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'salary', icon: 'salaryRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'selling', icon: 'sellRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'bills_and_utilities', icon: 'billsAndUtilitiesRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'food_and_beverage', icon: 'foodAndBeverageRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'shopping', icon: 'shoppingRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'entertainment', icon: 'entertainmentRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'television_bill', icon: 'tvBillRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'phone_bill', icon: 'phoneBillRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'water_bill', icon: 'waterBillRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'electricity_bill', icon: 'elektricityBillRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'restaurants', icon: 'restaurantsRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'groceries', icon: 'shoppingRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
    await db.collection('categories').updateMany(
      { value: 'clothing', icon: 'clothingRoundedIcon' },
      { $set: { icon: 'unknown' }}
    );
  }
};
