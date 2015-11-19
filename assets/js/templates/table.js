var tpl = function (_swig,_ctx,_filters,_utils,_fn) {
  var _ext = _swig.extensions,
    _output = "";
_output += "<table class=\"lego-table lego-table--dashboard\" data-sortable-table-id=\"dashboard-experiments\" data-test-section=\"dashboard-experiments\">\n  <thead>\n    <tr>\n      <th class=\"nowrap\">Text with Sub</th>\n      <th type=\"number\" class=\"numerical nowrap\">Number</th>\n      <th class=\"nowrap\">Regular Text</th>\n      <th type=\"date\" field=\"created\" class=\"nowrap\">Created</th>\n    </tr>\n  </thead>\n  <tbody>\n  	";
_ctx.arr = [ 1 ,  2 ,  3 ,  4 ,  5 ,  6 ,  7 ,  8 ,  9 ,  10 ];
_output += "\n  	";
(function () {
  var __l = (((typeof _ctx.arr !== "undefined" && _ctx.arr !== null) ? ((typeof _ctx.arr !== "undefined" && _ctx.arr !== null) ? _ctx.arr : "") : ((typeof arr !== "undefined" && arr !== null) ? arr : "")) !== null ? ((typeof _ctx.arr !== "undefined" && _ctx.arr !== null) ? ((typeof _ctx.arr !== "undefined" && _ctx.arr !== null) ? _ctx.arr : "") : ((typeof arr !== "undefined" && arr !== null) ? arr : "")) : "" ), __len = (_utils.isArray(__l) || typeof __l === "string") ? __l.length : _utils.keys(__l).length;
  if (!__l) { return; }
    var _ctx__loopcache06059676306322217 = { loop: _ctx.loop, x: _ctx.x, __k: _ctx.__k };
    _ctx.loop = { first: false, index: 1, index0: 0, revindex: __len, revindex0: __len - 1, length: __len, last: false };
  _utils.each(__l, function (x, __k) {
    _ctx.x = x;
    _ctx.__k = __k;
    _ctx.loop.key = __k;
    _ctx.loop.first = (_ctx.loop.index0 === 0);
    _ctx.loop.last = (_ctx.loop.revindex0 === 0);
    _output += "\n      	<tr spinner-size=\"small\" data-table-row-id=\"";
_output += _filters["e"]((((typeof _ctx.x !== "undefined" && _ctx.x !== null) ? ((typeof _ctx.x !== "undefined" && _ctx.x !== null) ? _ctx.x : "") : ((typeof x !== "undefined" && x !== null) ? x : "")) !== null ? ((typeof _ctx.x !== "undefined" && _ctx.x !== null) ? ((typeof _ctx.x !== "undefined" && _ctx.x !== null) ? _ctx.x : "") : ((typeof x !== "undefined" && x !== null) ? x : "")) : "" ));
_output += "\" style=\"position: relative;\">\n	        <td class=\"cell-truncate\">\n	        	<div class=\"cell-truncate__text\">\n	        		<span class=\"lego-tag\">sub text</span>\n	        	</div>\n	        	<div class=\"cell-truncate__title\">Text Title</div>\n	        </td>\n	        <td class=\"numerical\" data-dir=\"top-right\">\n	        	23\n	        </td>\n	        <td>\n	        	<span class=\"color--good-news\"> Running </span>\n	        </td>\n	        <td>\n	        	<div class=\"nowrap\"> July 21, 2015 </div>\n	        </td>\n      	</tr>\n    ";
    _ctx.loop.index += 1; _ctx.loop.index0 += 1; _ctx.loop.revindex -= 1; _ctx.loop.revindex0 -= 1;
  });
  _ctx.loop = _ctx__loopcache06059676306322217.loop;
  _ctx.x = _ctx__loopcache06059676306322217.x;
  _ctx.__k = _ctx__loopcache06059676306322217.__k;
  _ctx__loopcache06059676306322217 = undefined;
})();
_output += "\n  </tbody>\n</table>\n";

  return _output;

};
