const App = () => {

  const categories = [
    {
      id: 1,
      title: 'Hats',
      imgSrc: '',
    },
    {
      id: 2,
      title: 'Jackets',
      imgSrc: '',
    },
    {
      id: 3,
      title: 'Sneakers',
      imgSrc: '',
    },
    {
      id: 4,
      title: 'Womens',
      imgSrc: '',
    },
    {
      id: 5,
      title: 'Mens',
      imgSrc: '',
    },
  ];

  return (
    <div
      className="categories-container">
      {categories.map(category => (
        <div
          className="category-container">
          <div
            className="background-image" />
          <div
            className="category-body-container">
            <h2>{category.title}</h2>
            Shop Now
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
