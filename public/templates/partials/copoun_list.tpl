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
                        {posts.data.2}
                    </div>
                    <hr class="first-hr" />
                    <div class="item-body">
                        <span class="adHeader">
                            {posts.data.3}
                            <br />
                            {posts.data.4}
                        </span>
                        <br />

                        <span>
                            {posts.data.10}
                        </span>
                    </div>
                </div>
                <div class="popup" style="display:none">
                    <div class="popup-content">
                        <div class="popup-close">
                            <i class="fa fa-close"></i>
                        </div>
                        <div class="popup-header">
                            {posts.data.1}
                        </div>
                        <div class="popup-body">
                            {posts.data.2}
                            <br />

                            <span class="adHeader">
                                {posts.data.3}
                                <br />
                                {posts.data.4}
                            </span>
                            <br />

                            <span>
                                {posts.data.5}
                                <br />
                                {posts.data.6}
                                <br />
                                {posts.data.7}
                                <br />
                                {posts.data.8}
                                <br />
                                {posts.data.9}
                                <br />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- END posts -->
    </div>
</div>