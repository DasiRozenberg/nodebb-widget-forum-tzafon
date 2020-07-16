<div class="business">
	<div class="businessContainer container" data-numposts="{numPosts}" data-cid="{cid}">
		<div class="row">
		<!-- BEGIN posts -->
			<div class="item col-sm-3">
				<div data-pid="{posts.pid}" class="clearfix widget-posts">
				<!-- BEGIN posts.data -->
					<div>{posts.data}</div>
				<!-- END posts.data -->
				<div class="header">
					<img src="{posts.data.1}"/>
				</div>
				<div class="body">
					<i class="fa fa-list"></i>{posts.data.2}<br />
					<i class="fa fa-list"></i>{posts.data.3}<br />
				</div>
			</div>
		<!-- END posts -->
		</div>
	</div>
</div>

<script>
'use strict';
/* globals app, socket, translator, templates*/
(function() {
	function onLoad() {
		var replies = $('#recent_posts');

		app.createUserTooltips();
		processHtml(replies);

		var recentPostsWidget = app.widgets.recentPosts;
		var numPosts = parseInt(replies.attr('data-numposts'), 10) || 4;

		if (!recentPostsWidget) {
			recentPostsWidget = {};
			recentPostsWidget.onNewPost = function(data) {

				var cid = replies.attr('data-cid');
				var recentPosts = $('#recent_posts');
				if (!recentPosts.length) {
					return;
				}

				if (cid && parseInt(cid, 10) !== parseInt(data.posts[0].topic.cid, 10)) {
					return;
				}

				app.parseAndTranslate('partials/posts', {
					relative_path: config.relative_path,
					posts: data.posts
				}, function(html) {
					processHtml(html);

					html.hide()
						.prependTo(recentPosts)
						.fadeIn();

					app.createUserTooltips();
					if (recentPosts.children().length > numPosts) {
						recentPosts.children().last().remove();
					}
				});
			};

			app.widgets.recentPosts = recentPostsWidget;
			socket.on('event:new_post', app.widgets.recentPosts.onNewPost);
		}

		function processHtml(html) {
			html.find('img:not(.not-responsive)').addClass('img-responsive');
			html.find('span.timeago').timeago();
		}
	}


	if (window.jQuery) {
		onLoad();
	} else {
		window.addEventListener('load', onLoad);
	}
})();
</script>
