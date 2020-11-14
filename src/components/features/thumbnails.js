import React from 'react';
import {useState} from 'react'
import styled from 'styled-components';
//import Img from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';
import {theme} from '../../utils/theme'
import { breakpoints } from '../../utils/breakpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Thumbnails = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsGallery {
        nodes {
          photos {
            alt
            fluid {
              srcSet
            }
          }
        }
      }
    }
  `);

  const photos = data.allDatoCmsGallery.nodes[0].photos;

  const [imageToShow, setImageToShow] = useState("");
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);


  //function to show a specific image in the lightbox, amd make lightbox visible
  const showImage = (image) => {
    setImageToShow(image);
    setLightBoxDisplay(true);
  };

  //hide lightbox
  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  //show next image in lightbox
  const showNext = (e) => {
    e.stopPropagation();
    let currentIndex = photos.indexOf(imageToShow);
    if (currentIndex >= photos.length - 1) {
      setLightBoxDisplay(false);
    } else {
      let nextImage = photos[currentIndex + 1];
      setImageToShow(nextImage);
    }
  };

  //show previous image in lightbox
  const showPrev = (e) => {
    e.stopPropagation();
    let currentIndex = photos.indexOf(imageToShow);
    console.log(currentIndex);
    if (currentIndex <= 0) {
      setLightBoxDisplay(false);
    } else {
      let nextImage = photos[currentIndex - 1];
      setImageToShow(nextImage);
    }
  };

  /*const handleKey = (e) => {
    const key = e.key;
    switch (key) {
      case 'ArrowLeft':
        showPrev(e);
        console.log('left');
        break;
      case 'ArrowRight':
        showNext(e);
        console.log('right');
        break;
      case 'Escape':
        hideLightBox();
        console.log('esc');
        break;
      default:
        console.log('default');
    }
  }*/

 /* useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') {
        hideLightBox();
      /*} else if (e.key === 'ArrowLeft'){
        showPrev(e);
      } else if(e.key === 'ArrowRight'){
        showNext(e);
      }
    })*/
    /*window.addEventListener('keydown', (e) => {handleKey(e)});
    return () => {
      window.removeEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
          hideLightBox();
        /*} else if (e.key === 'ArrowLeft'){
          showPrev(e);
        } else if(e.key === 'ArrowRight'){
          showNext(e);
        }
      })*/
      /*window.removeEventListener('keydown', (e) => {handleKey(e)});
    }
  })*/

  return (
    <StyledContainer>
      {photos.map((photo, id) => (
        <StyledImageWrapper key={id} tabIndex={0} onClick={() => showImage(photo)} onKeyDown={() => showImage(photo)}>
          <img src={photo.fluid.srcSet} alt={photo.alt} />
        </StyledImageWrapper>
      ))}
      {
        lightboxDisplay ?
          <div id="lightbox" role='link' tabIndex={-1} onClick={hideLightBox} onKeyDown={hideLightBox}>
            <button onClick={showPrev} onKeyDown={(e)=> e.key === 'ArrowLeft' && showPrev}>
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
            </button>
            <img id="lightbox-img" src={imageToShow.fluid.srcSet} alt={imageToShow.alt}></img>
            <button onClick={showNext} onKeyDown={(e)=> e.key === 'ArrowRight' && showNext}>
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </button>
          </div>
        : ''
      }
    </StyledContainer>
  );
};

export default Thumbnails;

// Style

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  padding-top: 30px;

  #lightbox-img {
    height: 80vh;
    max-width: 80vw;
    object-fit: cover;
    z-index: 999;
    border: 1px solid white;
  }

  #lightbox {
    z-index: 11;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  button {
    color: ${theme.text};
    border: 2px solid ${theme.coral};
    border-radius: 5px;
    background-color: ${theme.coral};
    font-size: 32px;
    outline: thin dotted;
    margin: 10px;
  }

  button:hover,
  button::focus {
    cursor: pointer;
    background-color: ${theme.primary};
    border-color: ${theme.primary};
  }

`;

const StyledImageWrapper = styled.a`
  display: block;
  height: 360px;
  max-width: 360px;
  padding: 10px;
  position: relative;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

 :before {
    content: url('https://api.iconify.design/oi:magnifying-glass.svg?color=white&width=50&height=50');
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    border: 15px solid #fff;
    transform: translate(-50%, -50%);
    width: 341px;
    height: 341px;
    background: ${theme.coral};
    opacity: 0;
  }

  @media ${breakpoints.lg}{
    :hover:before{
      opacity: 60%;
      transition: .5s;
      cursor: pointer;
    }
  }
`;
