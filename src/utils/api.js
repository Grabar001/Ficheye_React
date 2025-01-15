import data from "../data/photographers.json";

export const getPhotographers = () => {
    return data.photographers;
};

export const getPhotographerById = (id) => {

    // id : receptionne lid
   
    const photographers = getPhotographers();
    const data = photographers.filter((photograph) => photograph.id == id);

    return data[0];
};

export const getMediasPhotographerById = (id) => {
    const media = data.media;
    const datas = media.filter((media) => media.photographerId == id);
        return datas;
};



 
