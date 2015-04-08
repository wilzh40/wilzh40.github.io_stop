---
layout: page
title: Portfolio
---

<div id="container" class="js-masonry animated fadeInUp"
data-masonry-options='{ "itemSelector": ".project" }'>
  {% for project in site.data.projects %}
  <div class="project">
    <h2 class="post-title">
        {{ project.title }}
    </h2>

    
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
  <script> msnry.layout()</script>
</div>