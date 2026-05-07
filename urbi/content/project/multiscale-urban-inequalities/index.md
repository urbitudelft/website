---
title: "Multiscale Urban Inequalities"
type: project
layout: multiscale-inequalities
markup: html
summary: ""
show_date: false
blocks:
  - type: text
    content: |
      Inequalities in cities exist at multiple scales. They appear whithin the street we live on, the nearby blocks we move through, the wider neighbourhood we identify with and, of course, at the scale of the entire city. 


      As we move further from where we live, the people and places around us change. The mix of residents, the types of buildings, and the opportunities we come across can look very different just a few hundred metres away. Our experience of the city depends not only on who lives next door, but also on the wider surroundings we are connected to.


      Because of this, understanding inequality means looking at cities at more than one scale. Thanks to detailed spatial data, we can now study how the social environment around a location changes as we “zoom in” to very small areas or “zoom out” to much larger ones. 


      # The limits of official boundaries

      The traditional way of measuring population characteristics is based on **administrative boundaries** (e.g., census tracts, postcode areas). These boundaries are convenient for policy and data reporting, but they often fail to reflect how people actually experience their surroundings:

      - they can be **too large**, hiding important local variation,  

      - they can be **arbitrary**, as their boundaries usually do not match how people move or interact,  

      - they can be **misleading** for residents who live close to the border of a unit.


      # A multiscale approach: bespoke neighbourhoods

      To overcome these limitations, we use **bespoke neighbourhoods**, introduced by [Johnston et al. (2000)](https://journals.sagepub.com/doi/10.1068/a3294), which are areas centred around individual locations that describe the particular spatial context to which people living there are potentially exposed. These bespoke neighbourhoods can be constructed at multiple scales, allowing us to capture how the surrounding population changes as we move further away from a location. 

  - type: scrolly
    title: "How we construct bespoke neighbourhoods"
    description: "In the interactive map below, you can explore how we constructed these bespoke neighbourhoods and how the surrounding population changes as we zoom out from very small areas to much larger ones. Scroll down to see how we build bespoke neighbourhoods."
    steps:
      - title: "1. Start from a single 100×100 m cell"
        body: |
          We start by calculating the composition of the spatial units.  
          We use 100×100 m CBS grid cells as the most local spatial units.
      - title: "2. Construct a 100 m bespoke area"
        body: |
          We draw a 100 m radius circle around the centroid of the cell and include all neighbouring cells whose centroids fall inside this boundary.  
          This forms the smallest bespoke neighbourhood.
      - title: "3. Expand the radius to 200 m"
        body: |
          We increase the radius in fixed increments of 100 m.  
          At 200 m, the bespoke area incorporates more nearby cells, smoothing out very local variation while still capturing the immediate surroundings.
      - title: "4. Expand to 300 m"
        body: |
          We repeat this process, further expanding the radius.  
          We gradually transition from the micro-scale context to the broader environment. Each increment produces a new bespoke neighbourhood.
      - title: "5. Repeat this process for multiple scales"
        body: |
          Larger radii capture the wider urban environment.  
          A 5 km bespoke area represents the broader setting in which the cell is embedded, extending well beyond the immediate neighbourhood.
      - title: "6. Reach a 10 km urban region"
        body: |
          For each cell, we repeat this process 101 times, from 0 to 10 km in 100 m increments, producing a detailed multi-scalar profile.  
          At 10 km, the bespoke neighbourhood approximates the cell’s wider metropolitan context.
  
  - type: text
    content: |
      By comparing how population characteristics change across these different radii, we can build a **multiscale representation** of the spatial context where people live and to which they are exposed. This approach helps us understand not only *where* inequalities exist, but also *at what scale* they are most pronounced.

      Our approach was developed using microgeographic grid data in The Netherlands from Statistics Netherlands (CBS in Dutch; see more details about the data [here](https://www.cbs.nl/en-gb/our-services/customised-services-microdata/microdata-conducting-your-own-research)), but **the methods presented here are applicable in countries where such data are not available**. For instance, the small census blocks in the United States, mesh blocks in New Zealand and Australia, output areas in the United Kingdom, or any other type of georeferenced census data are candidates for application and further exploration.

      Although they are not the only way of measuring the multiscale composition of spatial contexts, bespoke neighbourhoods offer a lens to understand inequalities in cities paying attention to the effects of location when measuring spatial contexts. 

      These overlapping areas, centred around individual locations, better capture how people experience their surroundings compared to fixed and non-overlapping spatial units.

      ![Figure describing overlapping bespoke neighbourhoods](images/overlap-bespoke-nbh.png#center)

      # From bespoke neighbourhoods to distance profiles

      Once we build bespoke neighbourhoods at a range of radii, we can look at how the social environment around a location **changes with distance**. Instead of describing a single neighbourhood, we obtain a **distance profile** of the place. 
      
      A **distance profile** shows how a characteristic changes across scales or, in other words, how the potential exposure to others varies as we move further away from a location. We introduce this methodology using ethnic composition.

  - type: distance-profile
    title: "How we construct distance profiles"
    description: "This interactive example shows how as the bespoke neighbourhood grows around a 100x100m grid cell, we calculate the distance profile on the right panel using the share of non-Western migrants in that neighbourhood. Move the slider to change the scale."

  - type: text
    content: |
      # Using distance profiles to understand sociospatial contexts

      In our paper called ['Multiscale Measures of Population: Within- and between-City Variation in Exposure to the Sociospatial Context'](https://urbi.bk.tudelft.nl/publication/journal-article/petrovic2018multi/), we created distance profiles for all cells within Amsterdam, Utrecht and Groningen. Below you can see a sample of the distance profile of nine 100x100m grid cells in Amsterdam:
            
      ![Example of distance profiles of 9 100x100m grid cells in Amsterdam](images/distance-profiles-9-examples-ams.svg#center)
      
      We can see that the sociospatial context of grid cells can change drastically with scale. 
      
      This is why we measured the variability of distance profiles using entropy:

      ![Individual distance profiles with minimum and maximum entropies in Amsterdam, Utrecht, and Groningen in 2013](images/min-max-entropy-petrovic-2018.jpg#center)

      In our analysis of distance profiles and their variability within and between cities, we demonstrated that scale matters in different ways within one city and across cities. In particular, we show that:
      
      - Different scales yield different measures of exposure to ethnicity, which may lead to different conclusions regarding an individual’s environment as a potential source of neighbourhood effects. 
      
      - Areas of high concentration can be blurred if too coarse a scale is used. Conversely, too fine a scale risks splitting larger areas of concentration into non-significant units and not representing the wider context in which an individual resides.
      
      - The relationship between scale and urban form is a fundamental issue for national level investigations into neighbourhood effects, or investigations taking in multiple urban centres, as measures of context at one scale possibly do not measure the same thing in different spaces.

  - type: text
    content: |
      # Using distance profiles to measure segregation

      The distance profiles help us to better understand segregation. In our paper called ['A comparative, multiscalar, and multidimensional study of residential segregation in seven European capital cities'](https://urbi.bk.tudelft.nl/publication/preprint/petrovic2026segeu/), we used European data from the [4DI Data Integration Challenge](https://knowledge4policy.ec.europa.eu/migration-demography/data-integration-d4i_en) to measure segregation for each spatial scale and represented the results on distance profiles of segregation.  

      ![Figure describing segregation profiles for multiple scales in seven European capital cities](images/segregation-profiles-4di-challenge.png#center)

  - type: text
    content: |
      # Using distance profiles to model spatial context effects

      Distance profiles also serve to better understand the effects of the spatial context on people across multiple scales. In our paper titled ['Where Do Neighborhood Effects End? Moving to Multiscale Spatial Contextual Effects'](https://urbi.bk.tudelft.nl/publication/journal-article/petrovic2021effects/), we modelled individual income based on people’s residential context characteristics for every scale of the distance profile. As you can see in the image below, we estimated the full set of parameters of spatial contextual effects for the entire range of spatial scales. In the distance decay model, we added a distance decay function to operationalise the diminishing effect of potential exposure to others as scale increases. 
      
      ![Figure showing the spatial context effect of contextual poverty on individual income](images/nbh-effects.jpg#center)
      
      This empirical finding supports that different mechanisms behind spatial context effects operate at different scales and, therefore, require different analytical scales for their estimation. We developed this idea in more detail in our theoretical paper called ''. 
      
      For instance, peer group effects require micro-scale, processes such as stigma require meso scales, while labor-market spatial mismatch requires regional geographies:

      ![Figure showing the analytical scale required for different spatial context effect mechanisms](images/multiscale-mechanisms-nbh-effects.jpg#center)

      
  - type: text
    content: |
      # Using distance profiles for multidimensional classification of spatial contexts  

      Distance profiles show how a single characteristic, such as income or ethnic composition, changes as we move further away from a location. But the environments we live in are shaped by many dimensions at once: socioeconomic conditions, demographic composition, and the housing market all influence everyday opportunities. 


      To capture this multidimensional and multiscale reality, we combined distance profiles from several key characteristics to classify spatial contexts. 


      In our paper titled [‘The spatio-temporal evolution of social inequalities in cities: a multidimensional, multiscalar and longitudinal approach for neighbourhood classification’](https://urbi.bk.tudelft.nl/publication/journal-article/urria2025spatio/) we proposed a way of creating this type of classification, using Amsterdam as a case study, in two main steps: 


      ### 1. Measuring the multiscale composition of residential contexts 


      For each 100×100 m grid cell in Amsterdam, we constructed bespoke neighbourhoods at seven spatial scales: 


      - The grid itself and bespoke areas of radii of 100 m, 200 m, 400 m, 800 m, 1,600 m, and 3,200 m. 


      At each scale, and for each year in 1999, 2003, 2007, 2011, 2015, 2019, and 2022, we measured the composition of these bespoke areas. This gives every grid cell a detailed multiscale profile across seven years and seven geographical scales. 


      ### 2. From multiscale profiles to neighbourhood types
      To classify this very large and complex dataset, we used Non-Negative Matrix Factorisation (NMF), a technique designed for finding interpretable structure in high-dimensional data. 


      Each bespoke area (including the grid cell itself) was classified based on its multidimensional composition, producing one cluster assignment per scale and per year.  


      As a result, every grid cell receives a multiscale, multidimensional, and longitudinal spatial profile, showing how its social environment looks at different distances and how it changes over time. This figure illustrates this spatial profile for a given grid cell: 

      <img src="images/multidimensional_spatial_profile_example.svg#center" alt="Figure showing the example of a multiscale spatial profile for a single 100x100m grid cell in Amsterdam" width="700"/>

      ## Understanding the evolution of social inequalities in the city of Amsterdam 

      These multiscale profiles allow us to see how each location in Amsterdam appears at different spatial scales in a given year, and how this “view” transforms as we zoom in or out. We can also follow the same place over time to observe changes in its surrounding environment, and whether these shifts are more pronounced at small or large scales. 


      Because the same cluster types are used across all years and scales, we can compare places consistently, tracing long-term trends, transitions between neighbourhood types, and the different ways inequality unfolds at different spatial scales. 


      The social structure of Amsterdam is composed mainly of 4 types of places:  

      - Cluster 1 – Older, lower-income Dutch households 

      - Cluster 2 – Affluent family-oriented homeowners 

      - Cluster 3 – Low-income, migrant-origin communities 
      
      - Cluster 4 – Young, mixed-income urban professionals and students 


      In the interactive map below, you can select any scale and year to explore the social structure of the Metropolitan Agglomeration of Amsterdam. The heatmap represents how important is each variable for the construction of the cluster. The higher the value, the higher prevalence of that group within that cluster compared to the other 3.  

  - type: amsterdam-map-selector
    title: "Amsterdam’s social urban structure over time and scales"
    description: >
      Select a year and a spatial scale to explore how the social structure of Amsterdam changes as we employ the composition of different bespoke areas to classify the 100x100m grid cells of the city. 
    years:
      - 2003
      - 2007
      - 2011
      - 2015
      - 2019
      - 2022

    scales:
      - Grid
      - 100m
      - 200m
      - 400m
      - 800m
      - 1600m
      - 3200m

    base_path: ""        
    ext: "webp"          

    coef_image: "images/coefmap_NMF_scales_nostd_k4_long_metaggl_10.webp"
    coef_caption: "Coefficient profiles of the four NMF clusters across scales. This heatmap represents how important is each variable for the construction of the cluster. The higher the value, the higher prevalence of that group within that cluster compared to the other 3."

    caption: >
      Each panel shows the dominant social structure in Amsterdam at the selected scale and year.

  - type: text
    content: |
      
      And by looking at changes in the social structure, we identify the following key insights: 

      - **The characteristics of places and how they change depends on where and at what scale we look.**

        Some neighbourhoods shift rapidly, others remain stable, and the patterns we observe differ markedly between small and large spatial scales. Urban transformation unfolds unevenly across the city’s geography. 

      - **For the specific case of Amsterdam: a clear concentric pattern emerges with an increasing centre-periphery divide.**

        The city centre is increasingly dominated gentrifying groups (cluster 4) that have replaced working-class older adults (cluster 1) and migrants (cluster 3). The former are increasingly fragmented (they almost disappear at larger scales) and the latter have been pushed to peripheral areas of the city. At the same time, affluent elite groups have consolidated in suburban parts of the city, reinforcing their residential privilege.  

 

---

