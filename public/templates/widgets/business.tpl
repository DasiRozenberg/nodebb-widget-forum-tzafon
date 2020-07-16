<div class="business">
	<div class="businessContainer container" data-numposts="{numPosts}" data-cid="{cid}">
		<div class="row">
		<!-- BEGIN posts -->
			<div class="item col-sm-3">
				<div data-pid="{posts.pid}" class="clearfix widget-posts">
					<div class="header">
						{posts.data.0}
					</div>
					<div class="body">
						<i class="fa fa-list"></i>{posts.data.1}<br />
						<i class="fa fa-list"></i>{posts.data.2}<br />
						<i class="fa fa-list"></i>{posts.data.3}<br />
					</div>
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
		var business = $('.business');

		processHtml(business);

		function processHtml(html) {
			$('.item', html).click(function (a,b,c){
				console.log(a,b,c)
				alert('check console')
			});
		}
	}


	if (window.jQuery) {
		onLoad();
	} else {
		window.addEventListener('load', onLoad);
	}
})();
</script>
