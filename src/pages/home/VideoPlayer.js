import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ReactPlayer from "react-player/lazy"
import Loading from '../shared/Loading';
import requests from '../../utils/API';

const VideoPlayer = () => {

    const [trailer, setTrailer] = useState([])


    const { data: trending = [], isLoading } = useQuery({
        queryKey: ["trending"],
        queryFn: async () => {
            const res = await fetch(requests.fetchTrending)
            const data = await res.json();
            
            return data.results[0];
        }
    })

    const data = fetch(
        `https://api.themoviedb.org/3/${trending?.media_type === 'tv' ? 'tv' : 'movie'
        }/${trending?.id}?api_key=b6d67655320fa17c181a5061388550aa&language=en-US&append_to_response=videos`)
        .then((response) => response.json())
        .then(data => {

            if (data?.videos) {
                const index = data.videos.results.findIndex(
                (element) => element.type === 'Trailer'
                )
                setTrailer(data.videos?.results[index]?.key)
            }
        })
    
    console.log(trending)

    if (isLoading) {
        return <Loading></Loading>
    }



    return (
        <div className='py-20'>
            <ReactPlayer
            url={
                `https://www.youtube.com/watch?v=${trailer}` ||
                `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
            }
            width="100%"
            height="600px"
            style={{ position: 'relative', top: '50', left: '0' }}
            playing
                controls
            />
        </div>
    );
};

export default VideoPlayer;