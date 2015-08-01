---
layout: page
title: Portfolio
---

<script src="/public/js/masonry.js"></script>
<!--div id="container" class="js-masonry animated fadeInUp"
data-masonry-options='{ "itemSelector": ".project", "gutter": 0
}'-->
<div class="animated fadeInUp" id="mason"> 
  {% for project in site.data.projects %}

  <div class="project">
    <h2 class="post-title">
        {{ project.title }}
    </h2>

    <p> * </p>
    {% if project.links.itunes != nil %}
    <a href="{{ project.links.itunes }}"> App Store </a>
    <p> * </p>
    {% endif %}
    {% if project.links.github != nil %}
    <a href="{{ project.links.github }}"> Github </a>
    <p> * </p>
    {% endif %}
    {% if project.links.challengepost != nil %}
    <a href="{{ project.links.challengepost }}"> ChallengePost </a>
    <p> * </p>
    {% endif %}
    {% for image in project.images %}
        <img class="img" src="{{ site.baseurl }}img/{{ image }}">

    {% endfor %}

    {{ project.description }}
    
    
  </div>
  {% endfor %}
  
</div>

<h2 class="post-title"> Awards </h2>

{% for award in site.data.awards %}
<p> {{ award.title }} </p>
{% endfor %}
