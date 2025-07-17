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
      title: About us (catchier title)
      subtitle: ''
      text: |
        <p style="text-align:center;">Brief description of the URBI research group, its mission, and what it does. This section should be engaging and informative, providing a clear overview of the group's focus and activities.
         {{% cta cta_link="./people/" cta_text="Meet the team →" %}}</p>
    design:
      columns: '1'

  - block: slider
    content:
      slides:
      - title: Research themes
        content: Take a look at what we're working on...
        align: center
        background:
          image:
            filename: coders.jpg
            filters:
              brightness: 0.7
          position: right
          color: '#666'
      - title: Neighbourhood effects
        content: 'Lorem ipsum'
        align: left
        background:
          image:
            filename: nbh-effects.jpg
            filters:
              brightness: 0.7
          position: center
          color: '#555'
        link:
          icon: graduation-cap
          icon_pack: fas
          text: See more
          url: ../project/nbh-effects/
      - title: Multiscale bespoke neighbourhoods
        content: 'Lorem ipsum'
        align: right
        background:
          image:
            filename: multiscale-bespoke-nbh.jpg
            filters:
              brightness: 0.5
          position: center
          color: '#333'
        link:
          icon: graduation-cap
          icon_pack: fas
          text: See more
          url: ../project/multiscale-bespoke-neighbourhoods/
    design:
      # Slide height is automatic unless you force a specific height (e.g. '400px')
      slide_height: ''
      is_fullscreen: true
      # Automatically transition through slides?
      loop: false
      # Duration of transition between slides (in ms)
      interval: 2000

  - block: collection
    content:
      title: News
      subtitle: 
      text:
      count: 5
      filters:
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
      page_type: post
    design:
      view: compact
      columns: '1'

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

  - block: collection
    content:
      title: Events
      subtitle:
      text:
      count: 5
      filters:
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
      page_type: event
    design:
      view: card
      columns: '1'

---
