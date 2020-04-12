module.exports = (mongoose) => {
    const ProductSchema = new mongoose.Schema(
        {
            name: String,
        },
        { collation: { locale: 'en_US', strength: 1 } }
    );

    mongoose.model('Product', ProductSchema);
};
