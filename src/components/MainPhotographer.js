import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";





export default function Main(data) {

  // [media, setMedia] : le tableau retourné par la fonction useState() contient la valeur de l'état (state) et la fonction permettant de l'éditer
  // media : la valeur de l'état que l'on va pouvoir utiliser partout dans le composant
  // setMedia : la fonction qui va permettre de mettre à jour l'état (setMedia(nouvelleValeur))
  // initialState (medias) : la valeur initiale de l'état des médias. Si aucune valeur n'est fournie, l'état est initialisé à null
    const photographer = data.photographer;
    const medias = data.medias;
  
    const { search } = useParams();



    // Total likes
     // const totalLikes = medias.reduce((sum, media) => sum + media.likes, 0);

    let nbTotalLikes = 0;
    medias.forEach((element) => {
      nbTotalLikes += element.likes;
    });
   
    const [media, setMedia] = React.useState(medias);
    const handleLikes = (id) => {
      const mediasCopy = [...media]; //spread operator (permet de creer une copie du tableau)
      // On filtre les medias en fonction de l'id du media et l'id du media sur lequel on a cliqué
      mediasCopy.forEach ((media) => {
        // Si l'id du media est égal à l'id du media sur lequel on a cliqué, on incrémente le likes
        if (media.id == id) 
          media.likes++;
        });
        // on mets à jour l'état des medias (+ likes) via la fonction setMedia
        setMedia(mediasCopy); 
    };
    // Open dropdown filter
    // true
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {

        // !false -> true
        // !true -> false
        setOpen(!open);
    };

    // State lightbox
    const [openLighbox, setOpenLightbox] = React.useState(false);
    const [index, setIndex] = React.useState(0);
  
    
    
    const[category, setCategory] = React.useState("Popularite");
   const [mediasSearch, setMediasSearch] = React.useState(medias);
   const handleSearch = (search) => {
    const mediasCopy = [...medias];

    //      Date
    switch (search) {
      case "Titre":
        mediasCopy.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Popularite":
        mediasCopy.sort((a, b) => b.likes - a.likes);
        break;
      case "Date":
        mediasCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    setMediasSearch(mediasCopy);
    setCategory(search);
    setOpen(false);
   };

   const currentPath = `/assets/images/photographers/samplePhotos-Medium/${photographer.name}/`;
    const slides = mediasSearch.map(({ image, video, title }) => ({
      ...(image ? {src: currentPath + image, description: title
      } : { type:"video", 
        width: 1280, 
        height: 720, loop: true,
         muted: true, 
         sources: [{src: currentPath + video, type: "video/mp4"}]}),
         description: title,
    }));

  

    return (
      <>
      <Lightbox
       index={index}
       on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
        captions={{ descriptionTextAlign: "center" }}
        counter={{ container: {style: { top: "unset", bottom: "0"}}}}
        open={openLighbox}
        plugins= {[Video, Thumbnails, Zoom, Slideshow, Captions, Counter, Download, Fullscreen]}
        close={() => setOpenLightbox(false)}
        slides={slides}
      />

        <main className="main__photographer">
          <div className="medias__sort">
            <p className="text__sort">Trier par</p>
            <div className="dropdown">
              <button className= {open ? "button__dropdown active__radius" : "button__dropdown"} onClick={handleOpen}>
                <p className="button__dropdown__text">{category}</p>
                <FontAwesomeIcon icon={faChevronDown } 
                className={open ? "fa-rotate-180" : ""}
                />
              </button>
              {open ? ( <div className="dropdown__content">
                <div className="dropdown__item">
                  <span
                  className="dropdown__link" onClick={() => handleSearch(category == "Date" ? "Popularite" : "Date")}
                  >
                    <hr className="separator" />
                    <span className="link__text">{category == "Date" ? "Popularite" : "Date"}</span>
                 </span>
                </div>
                <div className="dropdown__item">
                <span
                  className="dropdown__link" onClick={() => handleSearch(category == "Titre" ? "Popularite" : "Titre")}
                  > 
                    <hr className="separator" />
                    <span className="link__text">{category == "Titre" ? "Popularite" : "Titre"}</span>
                </span>
                </div>
              </div>
            ) : null}
             
            </div>
          </div>
          <section className="galery">
            {mediasSearch.map((element, index) => (
              <figure className="card" key={element.id}>
                {element.image ? (
                  <img
                    src={"/assets/images/photographers/samplePhotos-Medium/"+ photographer.name + "/" + element.image}  
                    alt={element.image}
                    className="galery__card__picture"
                    onClick={() => {
                      setOpenLightbox(true);
                      setIndex(index);
                    }}
                  />
                ) : (
                  <video
                    className="card__video"
                    autoPlay
                    loop
                    muted
                    src={"/assets/images/photographers/samplePhotos-Medium/" + photographer.name + "/" + element.video}
                    onClick={() => {
                      setOpenLightbox(true);
                      setIndex(index);
                    }}
                  ></video>
                )}
                <figcaption className="card__legend">
                  <p className="picture__title">{element.title}</p>
                  <div className="cards__likes">
                    <span className="nbLikes">{element.likes}</span>
                    <FontAwesomeIcon icon={faHeart} 
                className="icone__heart" 
                onClick={() => handleLikes(element.id)}
                />
                  </div>
                </figcaption>
              </figure>
            ))}
          </section>
          <div className="block__likes">
            <p>
                                            {/* {totalLikes} */}
            <span className="nb__total__likes">{nbTotalLikes}</span>
            <FontAwesomeIcon icon={faHeart} 
                className="icone__heart__likes" />
            </p>
            <p className="likes__price">{photographer.price}€ /jour</p>
          </div>
        </main>
        </>
    );
}