module.exports = (mongoose) => {
    const MovieSchema = new mongoose.Schema(
        {
            title: String,
            description: String,
        },
        { collation: { locale: 'en_US', strength: 1 } }
    );

    mongoose.model('Movie', MovieSchema);
};
