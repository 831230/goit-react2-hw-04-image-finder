import { useState, useEffect } from 'react';
import { fetchPictures } from 'components/fetchPictures/fetchPictures';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import ImageGalleryItems from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [nextPage, setNextPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [dataLargeImg, setDataLargeImg] = useState({
    large:'',
    alt:''
  });

  const addCurrentValue = (event) => {
    event.preventDefault();
    const value = event.target.elements.inputValue.value;
    setInputValue(value)
  }

  const fetchApi = async page => {
    setLoader(true)
    const searchText = inputValue.split(' ').join('+');

    fetchPictures(searchText, page).then(response => {
      setLoader(false)
      const totalHits = response.data.totalHits;
      const photos = response.data.hits.map(photo => {
        return {
          id: photo.id,
          largeImageURL: photo.largeImageURL,
          webformatURL: photo.webformatURL,
          description: photo.tags,
        };
      });
      setItems([...items, ...photos]);
      setTotalHits(totalHits);
      console.log(items);
    });
  };

  const loadMoreImages = () => {
    setNextPage(nextPage+1);
    setCurrentPage(nextPage);
  };

  const resetItems = () => {
    console.log("reset");
    setItems(items.length=0);
    setCurrentPage(1);
  };

  // useEffect(()=>{
  //   console.log("mount");
  //   setItems(items.length=0)
  // },[])

  useEffect(()=>{
    if(inputValue.length>0){
      resetItems();
      fetchApi()
    }
  },[inputValue]);

  useEffect(()=>{
    if(inputValue.length>0){
      fetchApi(nextPage)
      console.log(currentPage); 
    }
  },[currentPage]);

  const setDataToLargeImg = evt => {
    console.log("setDataToLargeImage");
    setDataLargeImg(
      dataLargeImg.large=evt.target.dataset.large,
      dataLargeImg.alt=evt.target.alt
    );
    console.log(dataLargeImg);
  };

  const closeModal = event => {
    const imgObj = {
      large: dataLargeImg.large,
      alt: dataLargeImg.alt
    };
    if (event.target.nodeName !== 'IMG' || event.keyCode === 'Escape') {
      imgObj.large = '';
      imgObj.alt = '';
    }
    setDataLargeImg(imgObj)
  };

    const showLoading = loader&&currentPage===1;
    const showLoadingMore = loader&&currentPage>1;

  return(

      <>
        <Searchbar onSubmit={addCurrentValue} />
        <Loader visually={showLoading}/>
        <ImageGallery closeModal={closeModal}>
          <ImageGalleryItems
            items={items}
            getData={setDataToLargeImg}
          />
        </ImageGallery>
        <Modal
          imgObject={dataLargeImg}
          closeModal={closeModal}
        />
        <Loader visually={showLoadingMore}  />
        <Button
          loadMore={loadMoreImages}
          items={items}
          totalHits={totalHits}
          currentPage={currentPage}
        />
      </>
  )
}

export default App;

