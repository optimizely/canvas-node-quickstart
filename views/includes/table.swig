<table class="lego-table lego-table--dashboard" data-sortable-table-id="dashboard-experiments" data-test-section="dashboard-experiments">
  <thead>
    <tr>
      <th class="nowrap">Text with Sub</th>
      <th type="number" class="numerical nowrap">Number</th>
      <th class="nowrap">Regular Text</th>
      <th type="date" field="created" class="nowrap">Created</th>
    </tr>
  </thead>
  <tbody>
  	{% set arr = [1,2,3,4,5,6,7,8,9,10] %}
  	{% for x in arr %}
      	<tr spinner-size="small" data-table-row-id="{{ x }}" style="position: relative;">
	        <td class="cell-truncate">
	        	<div class="cell-truncate__text">
	        		<span class="lego-tag">sub text</span>
	        	</div>
	        	<div class="cell-truncate__title">Text Title</div>
	        </td>
	        <td class="numerical" data-dir="top-right">
	        	23
	        </td>
	        <td>
	        	<span class="color--good-news"> Running </span>
	        </td>
	        <td>
	        	<div class="nowrap"> July 21, 2015 </div>
	        </td>
      	</tr>
    {% endfor %}
  </tbody>
</table>
