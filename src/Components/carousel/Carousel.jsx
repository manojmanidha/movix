import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../../Components/contentWrapper/ContentWrapper";
import Img from "../../Components/lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../../Components/Genres/Genres";

import "./style.scss";

const Carousel = ({ data, loading , endpoint, title }) => {
  const carouselConatainer = useRef();
  const { URL } = useSelector((state) => state.home);
  const navigate = useNavigate();


  const navigation = (dir) => {
    const container = carouselConatainer.current;

    const scrollAmount = dir === "left" ? container.scrollLeft -(container.offsetWidth+20) :
    container.scrollLeft +(container.offsetWidth+20);

    container.scrollTo({
      left : scrollAmount ,
      behaviour : "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton "></div>
        <div className="textBlock "></div>
        <div className="title skeleton "></div>
        <div className="date skeleton "></div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems " ref={carouselConatainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? URL.poster + item.poster_path
                : PosterFallback;
              return (
                <div key={item.id} className="carouselItem" onClick={()=>navigate(`/${item.media_type || endpoint}/${item
                .id}`)}>
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>

                  <div className="titleBlock">
                    <span className="title">{item.title || item.name}</span>
                    <br />
                    <span className="date">
                      {dayjs(item.release_Date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="lodingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
