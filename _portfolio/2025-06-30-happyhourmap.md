---
title: "Happyhour Map"
excerpt: "Website to find happyhour deals"
header:
  # image: /assets/images/test.jpg
  teaser: /assets/images/portfolio/happyhour/teaser.png
sidebar:
  - title: "Role"
    text: "Full Stack"
  - title: "Status"
    text: "Operating. [Link](https://happyhourmap.app/)"
  # - title: "Website"
  #   text: "[photobyme.ca](https://photobyme.ca)"    
gallery:
  - url: assets/images/portfolio/happyhour/gallery1.png
    image_path: assets/images/portfolio/happyhour/gallery1.png
    alt: "gallery1"
  - url: assets/images/portfolio/happyhour/gallery2.png
    image_path: assets/images/portfolio/happyhour/gallery2.png
    alt: "gallery2"
gallery2:
  - url: assets/images/portfolio/happyhour/mobile.png
    image_path: assets/images/portfolio/happyhour/mobile.png
    alt: "mobile"
  - url: assets/images/portfolio/happyhour/gallery1.png
    image_path: assets/images/portfolio/happyhour/gallery1.png
    alt: "gallery1"    
author_profile: true
layout: single
tags: [happyhourmap, business]
---


## Snapshot  
`HappyHourMap` is a location-based web application that connects users with nearby happy hour specials. The platform offers real-time filtering by time, distance, cuisine category, and deal type, helping users discover relevant promotions while driving traffic to local establishments.

{% include gallery caption="HappyHourMap Web Application" %}

## Market Problem
### Fragmented Discovery Experience

Despite their popularity, happy hour specials remain difficult for consumers to discover without visiting multiple websites or social media accounts.

### Limited Promotional Channels for Restaurants

Small and independent restaurants lack effective digital platforms to showcase their happy hour specials and increase visibility. Existing review sites rarely highlight these promotions despite their ability to drive significant foot traffic during off-peak hours.

## Key Contrinution

### Tech Stack
- Frontend: `React`, `TypeScript`
- Backend: `Node.js`
- Data Scraping with AI: `Python`, `Ollama`, `LangChain`,`BeautifulSoup`, `Pandas` 

### Built Responsive Full Stack Web Application

Designed and developed a responsive web application using `React`, `TypeScript`, and `Node.js` backend. Implemented geolocation services with the `Google Maps API` for proximity-based results and real-time filtering capabilities. [Live Site](https://happyhourmap.app/)

{% include gallery id="gallery2" caption="HappyHourMap Mobile & Desktop View" %}


### Intelligent Data Collection System

Developed a sophisticated data pipeline that combines web scraping with AI-powered data extraction. Using `Python`, `BeautifulSoup`, and `LangChain` with local LLMs (`Ollama`), the system autonomously harvests happy hour information from diverse web sources, processes unstructured data, and standardizes it for database storage—reducing manual data entry by over 85%.

### SEO & Performance Optimization

Implemented hybrid rendering architecture combining server-side rendering (SSR) for initial page loads and client-side rendering (CSR) for subsequent interactions. This approach improved SEO metrics by 45% while maintaining sub-2 second load times and high Lighthouse performance scores.

## Resources 

- [HappyHourMap Website](https://happyhourmap.app)