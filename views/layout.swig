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

		<div class="content">
			<div id="step_experiment" class="step">
					<div class="float--right">
							<a target="_blank" href="http://link.optimizely.com/headline-testing-app" style="margin-right: 10px;">
									<svg version="1.1" class="lego-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"

											 width="22px" height="22px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">

									<path id="help-2-icon" d="M256,50C142.229,50,50,142.229,50,256s92.229,206,206,206s206-92.229,206-206S369.771,50,256,50z

											 M258.25,392.9c-16.162,0-29.27-13.107-29.27-29.275c0-16.16,13.107-29.263,29.27-29.263c16.166,0,29.27,13.103,29.27,29.263

											C287.52,379.793,274.416,392.9,258.25,392.9z M281.262,306.385v5.266c0,0-43.883,0-48.248,0v-5.266

											c0-14.898,2.174-34.012,19.471-50.628c17.299-16.619,38.916-30.346,38.916-51.106c0-22.95-15.928-35.09-36.01-35.09

											c-33.463,0-35.65,34.705-36.475,42.347h-46.928c1.25-36.189,16.545-86.808,83.684-86.808c58.182,0,84.34,38.967,84.34,75.508

											C340.012,258.77,281.262,268.873,281.262,306.385z"/>

									</svg>
							</a>
<!--                 <svg class="lego-icon" id="settings_icon" >
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#settings"></use>
							</svg> -->
					</div>
					<h1>Create an experiment</h1>
					<form>
							<div class="lego-form__header">
									<div class="lego-form__title">Experiment-level details</div>
							</div>
							<fieldset>
									<ul class="lego-form-fields" id="experiment-level">
											<li class="lego-form-field__item">
													<label class="lego-label" for="Existing Headline">Article URL</label>
													<input placeholder="The page url with a headline you'd like to test" name="Article ID" type="text" class="lego-text-input" pattern=".+">
											</li>
											<li class="lego-form-field__item">
													<label class="lego-label" for="Existing Title">Original Headline</label>
													<input placeholder="The headline text you'd like to replace on the page" name="Existing Title" type="text" class="lego-text-input" pattern=".+">
											</li>
									</ul>
							</fieldset>
							<div class="lego-form__header">
									<div class="lego-form__title">Variation-level details</div>
							</div>
							<fieldset>
							<ul class="lego-form-fields" id="variation-level">
									<li class="lego-form-field__item">
											<label class="lego-label" for="Headline">Headline Variation</label>
											<table class="lego-table lego-table--add-row width--1-1">
													<tbody>
															<tr>
																	<td>
																			<div class="lego-grid">
																					<div class="lego-grid__cell">
																							<input type="text" class="lego-text-input" placeholder="Alternate headline you want to test">
																					</div>
																			</div>
																	</td>
																	<td class="lego-table--add-row__controls">
																			<button type="button" class="lego-button lego-button--form lego-button--narrow float--right button-close">
																					<svg class="lego-icon">
																							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>
																					</svg>
																			</button>
																			<button type="button" class="lego-button lego-button--form lego-button--narrow float--right push--right button-add">
																					<svg class="lego-icon">
																							<use xlink:href="#add"></use>
																					</svg>
																			</button>
																			</td>
																	</tr>
													</tbody>
											</table>
									</li>
							</ul>
							</fieldset>
							<div class="lego-form__footer lego-button-row lego-button-row--right">
									<input type="submit" class="lego-button lego-button--brand create-button" value="Create">
									<input type="submit" class="lego-button lego-button--brand create-and-start-button" value="Create and Start">
							</div>
					</form>
			</div>
	</div>

	<div id="overlay" class=" text--center">
			<div class="content">
					<div class="lego-spinner-wrap">
							<div class="lego-spinner"></div>
					</div>
					<h2 id="status"></h2></div>
	</div>
				<div class="modal" style="display: none"></div>
		<script src="/main.min.js"></script>
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-68637003-5', 'auto');
			ga('send', 'pageview');
		</script>
	</body>
</html>
