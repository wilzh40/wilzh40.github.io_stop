---
layout: page
title: About
---

Hello my name is Wilson

<div class="projects">
  {% for project in site.data.projects %}
  <div class="project">
    <h1 class="post-title">
      <a href="{{ project.link }}">
        {{ project.title }}
      </a>
    </h1>



    {{ project.description }}
  </div>
  {% endfor %}
</div>