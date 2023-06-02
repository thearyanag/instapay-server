const Owner = require('../../models/owner.model');

const createOwner = async (ownerData) => {
    const newOwner = new Owner(ownerData);
    const savedOwner = await newOwner.save();
    return savedOwner;
}

module.exports = createOwner;