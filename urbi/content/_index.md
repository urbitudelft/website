---
# Leave the homepage title empty to use the site title
title:
date: 2022-10-24
type: landing


sections:
  - block: markdown
    content:
      title:
      subtitle: ''
      text:
    design:
      columns: '1'
      background:
        image: 
          filename: logo_urbi_complete_3levels.png
          filters:
            brightness: 1
          parallax: false
          position: center
          size: contain
          text_color_light: true
      spacing:
        padding: ['20px', '0', '20px', '0']
      css_class: fullscreen

  - block: markdown
    content:
      title: About us
      subtitle: ''
      text: |
        We are a research group within the Department of Urbanism at TU Delft studying the causes, patterns, and consequences of urban inequalities. 
        
        By combining urban theory with spatial analysis, population data, and computational methods, we investigate how social and spatial inequalities shape cities and and individual life courses.

        {{% cta cta_link="./people/" cta_text="Meet the team →" %}}</p>
    design:
      columns: '1'
      background:
        color: "#ffffff"

  - block: slider
    content:
      slides:
      - title: Multiscale Urban Inequalities
        content: 'Explore how we study urban inequalities across multiple spatial scales.'
        align: right
        background:
          image:
            filename: multiscale-bespoke-nbh.png
            filters:
              brightness: 0.5
          position: center
          color: '#333'
        link:
          icon: graduation-cap
          icon_pack: fas
          text: Explore our research
          url: ../project/multiscale-bespoke-neighbourhoods/
    design:
      # Slide height is automatic unless you force a specific height (e.g. '400px')
      slide_height: ''
      is_fullscreen: true
      # Automatically transition through slides?
      loop: false
      # Duration of transition between slides (in ms)
      interval: 2000

  #- block: collection
  #  content:
  #    title: News
  #    subtitle: 
  #    text:
  #    count: 5
  #    filters:
  #      author: ''
  #      category: ''
  #      exclude_featured: false
  #      publication_type: ''
  #      tag: ''
  #    offset: 0
  #    order: desc
  #    page_type: post
  #  design:
  #    view: compact
  #    columns: '1'

  - block: collection
    content:
      title: Latest Publications
      text: ""
      count: 5
      filters:
        folders:
          - publication
        publication_type: 'article-journal'
    design:
      view: citation
      columns: '1'

---
