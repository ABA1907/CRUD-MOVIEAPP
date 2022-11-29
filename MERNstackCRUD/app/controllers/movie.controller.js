const db = require('../models/index');
const Movie = db.movies;

//create and save new movie
exports.create = (req,res) => {

  if(!req.body.title) {
    res.status(400).send({message: "Content can not be empty!!"});
  }

  const movie = new Movie({
    title: req.body?.title,
    year: req.body.year,
    director: req.body.director,
    description: req.body.description,
    // actors: [{
    //   type: String,
    // }],
    IMdB: req.body.IMdB,
    published: req.body.published ? req.body.published : false
  })

  movie
  .save(movie)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({message :
    err.message || "Some error occurred while creating new movie"
    });
  });
};

//retrive all movies from database
exports.findAll = (req,res) => {  
  const title = req.query.title;
  // console.log(title);

  // var condition = title ? {title : {$regex: new RegExp(title), options:"i"}}:{};
  const year = req.query.year;
  const director = req.query.director;
  var condition = {
    where: {
      $or: [
        {"title": {
          $regex: new RegExp(title),$options: "i"
        }},
        {"year": {
          $regex: new RegExp(year),$options: "i"
        }},
        {"director": {
          $regex: new RegExp(director),$options: "i"
        }},
        
      ]
    }
  }
  Movie.find(condition)
  .then(data => {
    if(!data){
      res.status(400).send({message: "The movie with this title cannort found"})
    }else{
      res.send(data);}
    })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some Error occured while retrieving movies."
    });
  });
};

//find a single movie with an id
exports.findOne = (req,res) =>{
  const id = req.params.id;

  Movie.findById(id)
  .then(data => {
    if(!data){
      res.status(400).send({message : "Not Found Movie with id" + id});
    } else {
      res.send(data);
    }
  })
  .catch(err => {
    res
    .status(500)
    .send({ message : "Error retrieving movie with id=" + id});
  });
};

exports.update = (req,res) => {
  if(!req.body){
    return res.status(400).send({
      message: "Data to update can not be empty!!"
    });
  }

  const id = req.params.id;

  Movie.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
  .then(data =>{
    if(!data){
      res.status(400).send({
        message: `Cannot update Movie with id=${id} . Maybe movie was not found!`
      }); 
    } else {
      res.send({message: "Movie was updated successfully"});
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating movie" + err
    });
  });
};

//delete movie with specific id 
exports.delete = (req,res) => {
  const id = req.params.id;

  Movie.findByIdAndRemove(id)
  .then(data => {
    if(!data){
      res.status(400).send({
        message : `Cannot delete movie with id= ${id}.`
      });
    } else {
      res.send({
        message: "Movie was deleted successfully"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Couldnt delete the movie with id= " +id
    });
  });
};

//delete all or clear

exports.deleteAll = (req,res) => {
  Movie.deleteMany({})
  .then(data => {
    res.send({
      messsage: `${data.deletedCount} Movies were deleted successfully`
    });
  })
  .catch(err =>{
    res.status(500).send({
      message: err.message || "Some error occured while removing all movies"
    });
  });
};

//find all movies
exports.findAllPublished = (req,res) => {
  Movie.find({published : true})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Erorr Occured"
    });
  });
};