import Header from "../components/HeaderPhotographer.js";   
import Main from "../components/MainPhotographer.js";
import { useParams } from "react-router-dom";
import { getPhotographerById, getMediasPhotographerById } from "../utils/api.js";  

const Photographer = () => {
    const { id, search } = useParams();
    const dataPhotograph = getPhotographerById(id);
    const dataMediaPhotograph = getMediasPhotographerById(id, search);
    return (
    <>
    <Header data={dataPhotograph} />
    <Main photographer={dataPhotograph} medias={dataMediaPhotograph} />
    </>
    );
};

export default Photographer;