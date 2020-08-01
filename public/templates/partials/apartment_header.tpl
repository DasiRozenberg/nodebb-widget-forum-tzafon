<div class="col-xs-12">
    <div class="filter-container apartmentFilter">
        <select id="apartmentType">
            <option value="">בחר סוג דירה</option>
            <!-- BEGIN apartmentTypes -->
            <option value="{apartmentTypes}">{apartmentTypes}</option>
            <!-- END apartmentTypes -->
        </select>		
        <select id="city">
            <option value="">בחר עיר</option>
            <!-- BEGIN cities -->
            <option value="{cities}">{cities}</option>
            <!-- END cities -->
        </select>
        <select id="bedNum">
            <option value="">בחר מס' מיטות</option>
            <!-- BEGIN bedNums -->
            <option value="{bedNums}">{bedNums}</option>
            <!-- END bedNums -->
        </select>
        <div class="flex-fill"></div>
        <a class="contact" href="/contact?mode=apartment">הוספת צימרים וחדרי אירוח</a>
    </div>
</div>