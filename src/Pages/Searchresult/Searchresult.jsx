import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import MovieCard from "../../Components/movieCard/MovieCard";
import Spinner from "../../Components/sinner/Spinner";
import noResults from "../../assets/no-results.png";
import ContentWrapper from "../../Components/contentWrapper/ContentWrapper";


const Searchresult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
        (res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        }
    );
};

const fetchNextData = () => {
  //  setLoading(true);
  fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
          if(data?.results){
            setData({
              ...data , results:[...data?.results, ...res.results]
            })
          }else{
            setData(res)
          }
          setPageNum((prev) => prev + 1);
      }
  );
};


useEffect(()=>{
  setPageNum(1)
   fetchInitialData();
},[query])




  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
            <div className="pageTitle">
              {`Search ${data.total_results > 1 ? "results" : "result" } of '${query}' `}
            </div>
            <InfiniteScroll
            className="content"
            dataLength={data?.results?.length || []}
            next={fetchNextData}
            hasMore={pageNum <= data?.total_pages}
            loader={<Spinner/>}
            >
              {data?.results.map((item , index )=>{
                if(item.media_type === "person") return;
                return (
                  <MovieCard key={index} data={item} fromSearch={true} ></MovieCard>
                )
              })}
            </InfiniteScroll>
            </>

          ):(
            <span className="resultNotFound" >Sorry , Results not found !</span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default Searchresult
