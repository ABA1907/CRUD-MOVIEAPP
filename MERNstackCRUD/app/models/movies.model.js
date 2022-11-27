module.exports = mongoose => {
  const Movie = mongoose.model(
    "movies",
    mongoose.Schema(
      {
        title: String,
        year: String,
        director: String,
        description: String,
        //actors: [{
        //  type: String,
        //}],
        IMdB: String,
        published: Boolean
      },
      {timestamp: true}
    )
  );
  return Movie;
};