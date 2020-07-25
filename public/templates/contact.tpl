<ol class="breadcrumb">
	<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
		<a href="/" itemprop="url">
			<span itemprop="title">
				[[global:home]]
			</span>
		</a>
	</li>
	<li component="breadcrumb/current" itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" class="active">
        <span itemprop="title">
            [[contactpage:contact]]
        </span>
	</li>
</ol>

<div class="alert alert-danger hidden" id="contact-notify">
    <strong>[[contactpage:contact-error]]</strong>
    <p></p>
</div>

<div class="alert alert-success hidden" id="contact-notify-success">
    <p></p>
</div>

<div class="col-xs-offset-2">
    <h3>לפרטים נוספים והצעת מחיר: 0583-22-00-90</h3>
</div>

<form id="contact-form" class="form-horizontal" role="form" method="post" enctype="multipart/form-data">
    <div class="form-group">
        <label class="control-label col-sm-2" for="email">[[contactpage:form.email]]</label>
        <div class="col-sm-10">
            <input type="email" class="form-control" id="email" name="email">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-sm-2" for="name">[[contactpage:form.name]]</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="name" name="name">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-sm-2" for="subject">[[contactpage:form.subject]]</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="subject" name="subject">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-sm-2" for="file">[[contactpage:form.file]]</label>
        <div class="col-sm-10">
            <input type="file" class="form-control" accept="image/*" id="fileUpload">
            <input type="hidden" id="file" name="file">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-sm-2" for="message">[[contactpage:form.message]]</label>
        <div class="col-sm-10">
            <textarea class="form-control vresize" rows="8" id="message" name="message"></textarea>
        </div>
    </div>
    <input type="hidden" name="_csrf" value="{config.csrf_token}" />
    <!-- IF recaptcha -->
    <div class="form-group">
        <label class="control-label col-sm-2">[[contactpage:form.captcha]]</label>
        <div class="col-sm-10">
            <div id="contact-page-google-recaptcha"></div>
        </div>
    </div>
    <!-- ENDIF recaptcha -->
    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <button id="send" class="btn btn-primary">[[contactpage:btn.send]]</button>
        </div>
    </div>
</form>
