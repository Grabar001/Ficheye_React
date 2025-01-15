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

export const getMediasPhotographerById = (id, search) => {
    const media = data.media;
    const datas = media.filter((media) => media.photographerId == id);


    if (search) {
        switch (search) {
            case "Titre":
                datas.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "Popularite":
                datas.sort((a, b) => b.likes - a.likes);
                break;
            case "Date":
                datas.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }
    }

        return datas;
};



 
