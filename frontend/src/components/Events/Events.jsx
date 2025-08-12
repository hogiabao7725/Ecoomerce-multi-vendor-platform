import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styles from '../../styles/styles'
import EventCard from "./EventCard";
import ProductCard from "../Route/ProductCard/ProductCard";

const Events = () => {
  const {allEvents, isLoading} = useSelector((state) => state.events);  
   
  return (
    <div>
     {
      !isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          {allEvents && allEvents.length > 0 ? (
            <div className="w-full mb-8">
              {allEvents.map((event, index) => (
                <EventCard key={event._id} data={event} active={index === 0} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-8">
              <div className="text-gray-500 text-lg mb-4">
                No events available at the moment
              </div>
              <div className="text-gray-400 text-sm">
                Check back later for exciting deals and promotions!
              </div>
            </div>
          )}

          {/* Display event products in a grid if available */}
          {allEvents && allEvents.length > 0 && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Event Products</h2>
                <p className="text-gray-600 mt-2">Special deals from our events</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {allEvents.slice(0, 10).map((event) => (
                  <ProductCard key={event._id} data={event} isEvent={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      )
     }
  </div>
  )
}

export default Events