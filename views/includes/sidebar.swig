<div class="lego-data-sidebar flex">
	<ul class="accordion" data-test-section="template-sidebar"> 
		<li class="accordion__item accordion__item--active template-preview-pane">
			<a class="accordion__link" href="#">Template Details</a>
			<div class="accordion__content-wrap" style="position: relative;"> 
				<div class="accordion__content" entity="experiments" style="position: relative;"> 
					<ul class="lego-sections"> 
						<li class="lego-sections__item flex"> 
							<div class="lego-button-row--left">
								<button id="data-import-btn" class="lego-button lego-button--brand" data-id="">Create Experiment</button>
							</div>
							<button id="data-edit-btn" class="lego-button lego-button--brand anchor--right" data-id="">Edit</button>
						</li> 
						<li class="lego-sections__item"> 
							<h3 data-test-section="editable-experiment-name">
								<span id="prev-title" data-test-section="experiment-name-span"></span>
							</h3> 
						</li>

						<li class="lego-sections__item" data-test-section="editable-experiment-description-prefix"> 
							<label class="lego-label lego-label--rule"> 
								<div class="flex"> 
									<div class="flex--1">Experiment Name Prefix</div> 
								</div> 
							</label>  
							<p id="prev-description-prefix"></p>
						</li>

						<li class="lego-sections__item" data-test-section="editable-experiment-edit-url"> 
							<label class="lego-label lego-label--rule"> 
								<div class="flex"> 
									<div class="flex--1">Editor URL</div> 
								</div> 
							</label>  
							<p id="prev-edit-url"></p>
						</li> 
						<li class="lego-sections__item" data-test-section="editable-experiment-desc"> 
							<label class="lego-label lego-label--rule"> 
								<div class="flex"> 
									<div class="flex--1">Description</div> 
								</div> 
							</label>  
							<p> 
								<i class="milli muted" id="prev-details"></i> 
							</p>
						</li> 

						<li class="lego-sections__item" data-test-section="experiment-sidebar-url"> 
							<label class="lego-label lego-label--rule"> 
								<div class="flex"> 
									<div class="flex--1">URL Targeting</div>
								</div> 
							</label> 
							<ul class="lego-list--bullet lego-list--spaced" id="prev-url-targeting"> 
							</ul> 
						</li>

						<li class="lego-sections__item" spinner-size="small" style="position: relative;"> 
							<label class="lego-label lego-label--rule"> 
								<div class="flex"> 
									<div class="flex--1">Audiences</div>
								</div> 
							</label> 
							<ul class="lego-list--bullet lego-list--spaced" id="prev-audience"> 
							</ul> 
						</li> 
						<li class="lego-sections__item" data-test-section="experiment-sidebar-goals"> 
							<label class="lego-label lego-label--rule"> 
								<div class="flex"> 
									<div class="flex--1">Goals</div>
								</div> 
							</label> 
							<ul class="lego-list--bullet lego-list--spaced" id="prev-goals"> 
							</ul> 
						</li>
						<li class="lego-sections__item" data-test-section="experiment-sidebar-variations"> 
							<label class="lego-label lego-label--rule"> 
								<div class="flex"> 
									<div class="flex--1">Variations</div>
								</div> 
							</label> 
							<ul class="lego-list--bullet lego-list--spaced" id="prev-variations"> 
							</ul> 
						</li>
						<li class="lego-sections__item" data-test-section="experiment-sidebar-global"> 
							<label class="lego-label lego-label--rule"> 
								<div class="flex"> 
									<div class="flex--1">Global Information</div>
								</div> 
							</label> 
							<ul class="lego-list--bullet lego-list--spaced" id="prev_global"> 
								<li id="prev-activation">Activation Mode <span class="tagger"></span></li>
								<li id="prev-experiment-js">Experiment JS <span class="tagger"></span></li>
								<li id="prev-experiment-css">Experiment CSS <span class="tagger"></span></li>
							</ul> 
						</li>
						<li class="lego-sections__item flex"> 
							<div class="lego-button-row--left">
								<button id="delete-template-btn" class="lego-button lego-button--brand" data-id="">Delete</button>
							</div>
						</li> 
					</ul>
				</div>
			</div> 
		</li>
	</ul>
</div>