export default function Main(photographers) {

  const data = photographers.data;
  return (
    <main className="main">
      {data.map((photographer) => (
        <div className="card" key={photographer.id}>
        <div className="card__picture__circle">
          <a
            href={"photographer/" + photographer.id}
            className="card__link"
          >
            <img
              src={"assets/images/photographers/thumbnails/" + photographer.portrait}
              className="card__picture"
            />
            <h3 className="card__title">{photographer.name}</h3>
          </a>
        </div>
        <div className="card__content">
          <p className="card__localisation">
            {photographer.city},{photographer.country}</p>
          <p className="card__slogan">{photographer.tagline}</p>
          <p className="card__price">{photographer.price}/jour</p>
        </div>
      </div>
      ))}
    </main>
  );
}