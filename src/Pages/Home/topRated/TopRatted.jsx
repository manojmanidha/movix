import React, { useState } from 'react';


import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const TopRated = () => {
  const [endpoint , setEndpoint]= useState("movie");

  const {data , loading}= useFetch(`/${endpoint}/top_rated`)

  const onTabChange = (tab)=>{
    setEndpoint(tab === "movies" ? "movie" : "tv")
  }

  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs data={["Movies" , "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} endpoint={endpoint} loading={loading} />
    </div>
  )
}
export default TopRated