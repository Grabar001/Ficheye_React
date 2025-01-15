import Header from '../components/Header';
import Main from '../components/Main';
import { getPhotographers } from '../utils/api';

const Home = () => {
  const data = getPhotographers();
    return (
      <>
      <Header /> 
      <Main data={data} />
      </>   
    );
};

export default Home;