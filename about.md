---
layout: page
title: About
---

Published Apps

<div class="projects">
  {% for project in site.data.projects %}
  <div class="project">
    <h1 class="post-title">
        {{ project.title }}
    </h1>
    
    <h3> Links </h3>
    
    {% if project.links.itunes != nil %}
    <a href="{{ project.links.itunes }}"> App Store </a>
    {% endif %}
    
    {% if project.links.github != nil %}
    <a href="{{ project.links.github }}"> Github </a>
    {% endif %}
    
    {% for image in project.images %}
        <img class="img" src="{{ site.baseurl }}img/{{ image }}">

{% endfor %}

    {{ project.description }}
    
    
  </div>
  {% endfor %}
</div>