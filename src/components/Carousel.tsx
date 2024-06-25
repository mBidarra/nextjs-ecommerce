"use client";

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Product } from '@/app/types';
import { usePathname } from "next/navigation";


interface CarouselProps {
    products: Product[];
  }
  
  const Carousel: React.FC<CarouselProps> = ({ products }) => {
    const pathname = usePathname();
    console.log(pathname);
    const isSearchPage = pathname.includes("search");
  
    if (isSearchPage) {
  
      return null; // Não renderizar o carrossel se estiver na página de busca
    }
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
  
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="p-4">
              <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover" />
              <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="font-bold">{product.price}</p>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default Carousel;
