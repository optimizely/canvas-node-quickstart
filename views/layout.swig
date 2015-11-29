<html>
	<head>
		<link rel="stylesheet" href="/main.min.css">
	</head>
	<body>
		<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
			<symbol id="add" viewBox="-590 386 16 16">
			  <path d="M-575 395v-2h-6v-6h-2v6h-6v2h6v6h2v-6z"/>
			</symbol>
			<symbol id="close" viewBox="-289 381 32 32">
			  <path d="M-261.7 389.8l-4.2-4.2-7.1 7.1-7.1-7.1-4.2 4.2 7.1 7.1-7.1 7.1 4.2 4.2 7.1-7.1 7.1 7.1 4.2-4.2-7.1-7.1z"/>
			</symbol>
		</svg>
		<input type="hidden" id="optimizely_token" value="{{ optlyUser.client.access_token }}" />
		<input type="hidden" id="project_id" value="{{ optlyUser.environment.current_project }}" />

		{# TOP SUB MENU #}
		{% include "includes/sidebar.swig" %}

		<div class="flex--1 flex flex--column main-container full-screen">
			<div class="flex--1 flex width-1">
				<div class="flex--1 flex flex--column width-1">
					<div class="flex--none width-1">
						<!-- top controls -->
						<ul class="flex push-double--ends header soft-double--sides" data-ui-component="dashboard-toolbar">
							<li class="push-triple--right">
								<h3>Canvas / Nodejs Quickstart <sup class="beta">BETA</sup></h3>
							</li>
							<li class="anchor--right">
								<div class="lego-button-row--left">
								  	<button class="lego-button lego-button--brand" id="show-lightbox">Show Lightbox</button>
								</div>
							</li>
						</ul>

						<div class="lego-attention lego-attention--bad-news text--center push-double--bottom errormessage"></div>
							<div class="flex--1 overflow-y--auto width-1" style="position: relative;">
							  {% block content %}{% endblock %}
							</div>
					</div>
				</div>
				{# PREVIEW SIDEBAR #}
				{% include "includes/sidebar.swig" %}
			</div>
		</div>
		<script src="/main.min.js"></script>
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', '{{ ga-code }}', 'auto');
		  ga('send', 'pageview');
		</script>
	</body>
</html>
