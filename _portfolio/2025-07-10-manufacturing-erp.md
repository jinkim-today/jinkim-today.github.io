---
title: "[Outsourcing] AI Powered ERP"
excerpt: "AI-powered ERP system developed for a South Korean manufacturing firm via international outsourcing contract"
header:
  # image: /assets/images/test.jpg
  teaser: /assets/images/portfolio/manufacturing-erp/dashboard.png
sidebar:
  - title: "Role"
    text: "Full Stack Developer"
  - title: "Status"
    text: "In Progress. [Link](http://10.0.0.246:5173/sign-in)"
gallery:
  - url: assets/images/portfolio/manufacturing-erp/login.png
    image_path: assets/images/portfolio/manufacturing-erp/login.png
    alt: "login"
  - url: assets/images/portfolio/manufacturing-erp/dashboard.png
    image_path: assets/images/portfolio/manufacturing-erp/dashboard.png
    alt: "dashboard"
gallery2:
  - url: assets/images/portfolio/manufacturing-erp/production-log.png
    image_path: assets/images/portfolio/manufacturing-erp/production-log.png
    alt: "production-log"
  - url: assets/images/portfolio/manufacturing-erp/add-production-log.png
    image_path: assets/images/portfolio/manufacturing-erp/add-production-log.png
    alt: "add-production-log"
gallery3:    
  - url: assets/images/portfolio/manufacturing-erp/certificate.png
    image_path: assets/images/portfolio/manufacturing-erp/certificate.png
    alt: "certificate"
  - url: assets/images/portfolio/manufacturing-erp/certificate2.png
    image_path: assets/images/portfolio/manufacturing-erp/certificate2.png
    alt: "certificate2"    
author_profile: true
layout: single
date: 2025-07-10
updated: 2025-07-31
tags: [manufacturing-erp, business, outsourcing]
---


## Snapshot  
This custom `ERP` system was developed as a comprehensive web application for a manufacturing company based in Busan, South Korea. Secured through an international outsourcing contract, the system provides integrated management of production processes, inventory control, and business operations exclusively for internal company use.

{% include gallery caption="Manufacturing Company ERP" %}

## Related Posts

| Title | Date |
| --- | --- |
| [Manufacturing Defect Detection](/portfolio/2025-07-20-manufacturing-defect-detection) | 2025-07-20 |

## Industry Challenges

### Enterprise Solutions in Small Manufacturing

Small to mid-sized manufacturing firms face significant obstacles with traditional ERP systems. These companies typically operate with limited administrative staff but still require comprehensive process management. Commercial ERP platforms are prohibitively expensive, excessively complex, and filled with unnecessary features that create implementation barriers.

### Need for Customized Workflows

Manufacturing operations in South Korea have unique regulatory requirements and specific production workflows that off-the-shelf solutions fail to address. Without tailored systems, companies resort to inefficient manual processes, spreadsheet workarounds, and disconnected data silos that hinder productivity and reporting accuracy.

### AI Integration Opportunities

The client identified AI integration as a strategic priority to enhance decision-making capabilities. Predictive maintenance, inventory optimization, and production forecasting were key areas where machine learning could deliver operational advantages that would differentiate them from competitors still using traditional management methods. 

## Key Features

### Production & Quality Control Tracking

Implementing a comprehensive tracking system that manages production and receiving logs with integrated barcode scanning capabilities. The system enables real-time defect identification, root cause analysis, and production line monitoring through an intuitive interface. Quality control managers can instantly generate performance reports and identify recurring issues to improve manufacturing quality.

### Streamlined Supplier Integration

Developing a secure supplier portal that eliminates paper-based processes and manual data entry. External suppliers will be able to upload inventory manifests directly through a dedicated interface, which automatically integrates with the ERP system. This innovation aims to reduce processing time and minimize transcription errors in the receiving process.

{% include gallery id="gallery2" caption="Production Log Management" %}

### Automated Certification System

Designing an automated certification generation system that produces standardized quality assurance documents required by downstream customers. The system will dynamically create certificates based on production data, allowing export to PDF, Excel, or direct sharing via secure AWS S3 presigned URLs. This feature aims to significantly reduce the time spent on manual certificate creation.

{% include gallery id="gallery3" caption="Automated Certificate Generation" %}

### AI-Powered Analytics Dashboard

Integrating PostgreSQL data with a Retrieval Augmented Generation (RAG) system to provide AI-powered production analytics. The dashboard will offer natural language querying of complex production data, predictive maintenance alerts, and anomaly detection capabilities. This will allow management to identify operational trends and make data-driven decisions without requiring specialized data analysis expertise.

### Computer Vision Quality Assurance

Developing a computer vision module that automatically inspects products for defects, with the goal of significantly improving quality control efficiency. The system will provide real-time feedback to production staff and integrate seamlessly with the ERP's tracking features. Additional details about this cutting-edge capability are available in a [dedicated portfolio entry](/portfolio/2025-07-20-manufacturing-defect-detection).

## Key Contrinution

### Tech Stack
- Frontend: `React`, `TypeScript`
- Backend: `Node.js` `PostgreSQL`
- Devops: `Docker`, `AWS EC2`, `AWS S3`
- AI Integration: `Python`, `Ollama`, `LangChain`,`RAG` 
- Project Management: `Jira`

### Full-Stack Manufacturing System

Designed and developed a responsive manufacturing ERP system with `React`, `TypeScript`, and `Node.js` backed by `PostgreSQL`. The application features role-based access control, real-time production tracking, inventory management with barcode integration, and a comprehensive reporting dashboard that consolidates critical KPIs for management decision-making.

{% include gallery id="gallery2" caption="Manufacturing ERP Dashboard & Login" %}

### Database Architecture & API Design

Designed a comprehensive data model using Entity Relationship Modeling (ERM) techniques tailored to manufacturing workflows. Created a normalized PostgreSQL database schema with optimized indexes for high-volume transaction processing. Developed a RESTful API layer with OpenAPI/Swagger documentation, ensuring secure data exchange between the frontend, mobile applications, and third-party systems while maintaining strict data validation protocols.

### Cloud Infrastructure & Deployment

Establishing a robust cloud infrastructure on `AWS EC2` with containerized application components using `Docker`. Implementing automated backup systems to `AWS S3` and creating a CI/CD pipeline that enables continuous deployment with minimal downtime. This architecture aims to ensure high system availability while allowing secure remote access for the client's distributed workforce.

### AI-Powered Forecasting

Developing a custom AI module using `Python`, `LangChain` and local LLMs via `Ollama` that analyzes historical production data to forecast material requirements and identify potential bottlenecks. The system employs a `RAG` (Retrieval Augmented Generation) approach to incorporate company-specific knowledge with predictive analytics, with the goal of improving inventory planning accuracy and reducing stockouts. 

### Resources 

- [Manufacturing ERP Website](http://10.0.0.246:5173/sign-in)