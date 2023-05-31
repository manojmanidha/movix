import React, { useState } from 'react';


import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../Components/carousel/Carousel';

const Trending = () => {
  const [endpoint , setEndpoint]= useState("day");

  const {data , loading}= useFetch(`/trending/all/${endpoint}`)

  const onTabChange = (tab)=>{
    setEndpoint(tab === "Day" ? "day" : "week")
  }

  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["day" , "week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  )
}
export default Trending
