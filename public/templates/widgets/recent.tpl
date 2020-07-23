<div class="recent col-lg-9 col-sm-12">

	<div class="clearfix">
		<div class="pull-left">
		<!-- IMPORT partials/breadcrumbs.tpl -->
		</div>
		<div class="pull-right">
			<!-- IF loggedIn -->
			<button id="new_topic" class="btn btn-primary">[[category:new_topic_button]]</button>
			<!-- ELSE -->
			<a href="{config.relative_path}/login" class="btn btn-primary">[[category:guest-login-post]]</a>
			<!-- ENDIF loggedIn -->
		</div>
	</div>

	<hr />

	<div class="category">
		<!-- IF !topics.length -->
		<div class="alert alert-warning" id="category-no-topics">
			<strong>[[recent:no_recent_topics]]</strong>
		</div>
		<!-- ENDIF !topics.length -->

		<a href="{config.relative_path}/recent">
			<div class="alert alert-warning hide" id="new-topics-alert"></div>
		</a>

		<!-- IMPORT partials/topics_list.tpl -->
	</div>
</div>

<script>
'use strict';
/* globals app, socket, translator, templates*/
(function() {
	function onLoad() {
		var recent = $('.recent');

		processHtml(recent);

		function processHtml(html) {
			html.removeClass('col-lg-9 col-sm-12').insertAfter($('.business'));
		}
	}


	function tryToLoad() {
		if (window.jQuery) {
			onLoad();
		}
		else {
			setTimeOut(function() {
				tryToLoad();
			});
		}
	}

	tryToLoad();
})();
</script>
