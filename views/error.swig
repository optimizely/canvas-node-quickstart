{% extends 'layout.swig' %}
{% block content %}
	{# Error Page #}
  <div class="lego-attention lego-attention--bad-news text--center push-double--bottom errormessage" style="display:block;">
    {{ message }}
  </div>
{% endblock %}
