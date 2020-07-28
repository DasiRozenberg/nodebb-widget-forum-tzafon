<div class="col-xs-12">
    <div class="itemsContainer">
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

<h1>Apartment list</h1>

    <!-- BEGIN posts -->
        <div class="col-sm-3">
            <div class="item">
                <div data-pid="{posts.pid}" class="clearfix widget-posts">
                    <div class="item-header">
                        {posts.data.1}
                    </div>
                    <hr class="first-hr" />
                    <hr class="second-hr" />
                    <div class="item-body">
                        <i class="fa fa-th-large"></i>
                        <span class="sub">
                            {posts.data.2}
                            <!-- IF !posts.data.2 --><i class="no-data">אין נתונים</i><!-- END -->
                        </span>
                        <br />

                        <i class="fa fa-map-marker"></i>
                        <span class="address">
                            {posts.data.4}, {posts.data.5}
                            <!-- IF !posts.data.5 --><i class="no-data">אין נתונים</i><!-- END -->
                        </span>
                        <br />

                        <i class="fa fa-clock-o"></i>
                        <span class="hours">
                            {posts.data.6}
                            <!-- IF !posts.data.6 --><i class="no-data">אין נתונים</i><!-- END -->
                        </span>
                        <br />
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
                            <i class="fa fa-th-large"></i>
                            {posts.data.2}
                            <!-- IF !posts.data.2 --><i class="no-data">אין נתונים</i><!-- END -->
                            <br />
                            
                            <i class="fa fa-map-marker"></i>
                            {posts.data.4}, {posts.data.5}
                            <!-- IF !posts.data.5 --><i class="no-data">אין נתונים</i><!-- END -->
                            <br />
                            
                            <i class="fa fa-clock-o"></i>
                            {posts.data.6}
                            <!-- IF !posts.data.6 --><i class="no-data">אין נתונים</i><!-- END -->
                            <br />

                            <i class="fa fa-phone"></i>
                            {posts.data.7}
                            <!-- IF !posts.data.7 --><i class="no-data">אין נתונים</i><!-- END -->
                            <br />
                            
                            <div class="notes">הערות</div>
                            {posts.data.8}
                            {posts.data.9}
                            {posts.data.10}
                            {posts.data.11}
                            <!-- IF !posts.data.8 --><i class="no-data">אין נתונים</i><!-- END -->
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- END posts -->
    </div>
</div>