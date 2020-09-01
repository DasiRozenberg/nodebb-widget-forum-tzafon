<div class="col-xs-12">
    <div class="itemsContainer adContainer">
    <!-- IF !posts.length -->
        <a class="no-posts-container" href="/contact">
            <div class="no-posts-header">
                העמוד יעלה בקרוב
            </div>
            <div class="no-posts-body">
                אם יש לך דירות לפרסום/ מודעות דרושים/ מתווכים/ עסקים
                <br />
                או כל מידע רלוונטי אחר ניתן להשאיר פרטים כאן וניצור איתכם קשר
            </div>
        </div>
    <!-- END -->

    <!-- BEGIN posts -->
        <div class="col-sm-4 col-xs-6">
            <div class="businessItem">
                <div data-pid="{posts.pid}" class="clearfix widget-posts">
                    <div class="item-header">
                        {posts.data.1}
                    </div>
                    <hr class="first-hr" />
                    <hr class="second-hr" />
                    <div class="item-body">
                        <span class="adHeader">
                            {posts.data.2}
                            <br />
                            {posts.data.3}
                        </span>
                        <br />

                        <span>
                            {posts.data.4}
                        </span>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    <!-- END posts -->
    </div>
</div>