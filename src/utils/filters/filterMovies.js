const filterMovies = (movies) =>
  movies?.filter(
    (movie) =>
      movie.original_language === "en" && /[а-яА-ЯЇїІіЄєҐґ]/.test(movie.title)
  );
export default filterMovies;
